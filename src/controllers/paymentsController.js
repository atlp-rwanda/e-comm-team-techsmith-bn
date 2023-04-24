import dotenv from 'dotenv';
import stripe from 'stripe';
import db from '../../database/models/index.js';

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
        });
        // UPDATE ORDER STATUS
        const updateOrder = await findOrder.update({
          status: 'paid',
        });
        const { status } = updateOrder;
        return res.status(201).json({
          ok: true,
          message: 'Payment successfully added and order status updated',
          data: createPayment,
          status,
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
}
export default PaymentsController;
