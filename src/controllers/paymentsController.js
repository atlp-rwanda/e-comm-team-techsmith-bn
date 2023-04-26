import dotenv from 'dotenv';
import stripe from 'stripe';
import db from '../../database/models/index.js';
import { nodeMail, paymentSuccessfulMessage } from '../utils/emails.js';

// LOAD MODELS FROM DB
const { payment, order } = db;

// CONFIGURE DOTENV
dotenv.config();

// LOAD SECRET
const { STRIPE_SECRET_KEY } = process.env;

// CONFIGURE STRIPE
const stripePayment = stripe(STRIPE_SECRET_KEY);

class PaymentsController {
  // CREATE PAYMENT
  static async createPayment(req, res) {
    // RETRIEVE VALUES RETURNED BY THE MIDDLEWARE
    const { findUser, findOrder, findProduct } = res.locals;
    const { card } = req.body;
    try {
      // eslint-disable-next-line
      console.log(findProduct, findOrder, findUser);
      // CREATE STRIPE TOKEN
      const stripeToken = await stripePayment.tokens.create({
        card,
      });
      // CREATE STRIPE CUSTOMER
      const stripeCustomer = await stripePayment.customers.create({
        email: findUser.email,
        source: stripeToken.id,
        address: {
          line1: findUser.physicalAddress,
        },
        name: findUser.name,
        description: `Customer for ${findUser.email}`,
      });
      // CREATE STRIPE CHARGE
      const stripeCharge = await stripePayment.charges.create({
        amount: findOrder.amount,
        currency: 'usd',
        customer: stripeCustomer.id,
        description: `Charge for ${findProduct.name}`,
      });
      if (stripeCharge) {
        // CREATE PAYMENT RECORD
        const createPayment = await payment.create({
          orderId: findOrder.id,
          userId: findUser.id,
          receiptUrl: stripeCharge.receipt_url,
          attributes: { exclude: ['updatedAt', 'createdAt', 'userId'] },
        });
        const { userId, orderId, ...rest } = createPayment.dataValues;
        // SEND EMAIL TO USER
        nodeMail(
          findUser.email,
          findUser.name,
          `Payment for ${findProduct.name} was successful`,
          paymentSuccessfulMessage,
          createPayment.receiptUrl
        );
        // UPDATE ORDER STATUS
        const updateOrder = await findOrder.update(
          {
            status: 'Paid',
          },
          { returning: true }
        );
        const { status } = updateOrder;
        const { name, email } = findUser;
        return res.status(201).json({
          ok: true,
          message: 'Payment successfully added and order status updated',
          data: rest,
          status,
          user: {
            name,
            email,
          },
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // GET PAYMENTS
  static async getPayments(req, res) {
    try {
      // GET USER FROM LOCALS
      const { id } = res.locals;
      // GET PAYMENTS
      const getPayments = await payment.findAll({
        where: { userId: id },
        include: [
          {
            model: order,
            as: 'order',
            attributes: ['amount', 'status'],
          },
        ],
      });
      return res.status(200).json({
        ok: true,
        message: 'Payments retrieved successfully',
        data: getPayments,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // DELETE PAYMENT USING ORDER ID
  static async deletePayment(req, res) {
    const { orderId } = req.params;
    const { id } = res.locals;
    try {
      // CHECK IF ORDER IS PAID
      const findOrder = await order.findOne({
        where: { id: orderId },
      });
      // IF ORDER DOES NOT EXISTS
      if (!findOrder) {
        return res.status(404).json({
          message: 'Order does not exist',
        });
      }
      // CHECK IF USER OWNS ORDER
      if (findOrder.userId !== id) {
        return res.status(401).json({
          message: "You are not authorized to delete another user's order",
        });
      }
      // DELETE PAYMENT
      const deletePayment = await payment.destroy({
        where: { orderId },
      });
      return res.status(200).json({
        ok: true,
        data: deletePayment,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
export default PaymentsController;
