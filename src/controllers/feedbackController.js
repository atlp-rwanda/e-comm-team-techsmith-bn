import db from '../../database/models/index.js';

const Sequelize = require('sequelize');

const { Op } = Sequelize;

const { review, order, product, payment, user } = db;

class feedbackController {
  //   CREATING FEEDBACK
  static async createFeedback(req, res) {
    const { rating, feedback } = req.body;
    const { pId: productId } = req.params;

    try {
      // GETTING LOGGED IN USER CREDENTIALS
      const { id } = res.locals;

      // CHECKING IF THE USER HAS MADE AN ORDER
      const orderPlacement = await order.findOne({ where: { productId } });
      if (!orderPlacement) {
        return res.status(404).json({
          message: 'First make a order!',
        });
      }
      const orderId = orderPlacement.id;

      // CHECKING IF THE USER HAS MADE A PAYMENT
      const paymentConfirmation = await payment.findOne({
        where: {
          [Op.and]: [{ userId: id }, { orderId }],
        },
        include: [
          {
            model: order,
            as: 'order',
            attributes: ['id'],
          },
        ],
      });
      if (!paymentConfirmation) {
        return res.status(404).json({
          message: 'First complete payment process!',
        });
      }

      // SAVING THE PAYMENT IN THE DATABASE

      const saveReview = await review.create({
        userId: id,
        productId,
        rating,
        feedback,
      });

      return res.status(201).json({
        ok: true,
        message: 'Thanks for your feedback!',
        data: saveReview,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // GETTING FEEDBACK ON A PRODUCT
  static async allFeedback(req, res) {
    const { pId } = req.params;
    try {
      // CHECKING IF PRODUCT EXISTS
      const checkProduct = await product.findOne({ where: { id: pId } });
      if (!checkProduct) {
        return res.status(404).json({
          message: 'Product does not exists!',
        });
      }

      // CHECKING IF ANY USER HAS MADE AN ORDER ON THAT PRODUCT
      const paymentConfirmation = await order.findOne({
        where: { productId: pId },
      });
      if (!paymentConfirmation) {
        return res.status(404).json({
          message: 'The product has never been purchased',
        });
      }

      const orders = await review.findAll({
        where: { productId: pId },
        attributes: {
          exclude: ['userId', 'productId', 'CreatedAt', 'UpdatedAt'],
        },
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name'],
          },
          {
            model: product,
            as: 'product',
            attributes: ['name'],
          },
        ],
      });
      //   CHECKING IF THE BUYER GAVE FEEDBACK ON THE PRODUCT
      if (orders.length <= 0) {
        return res.status(200).json({
          ok: true,
          message: 'We have no feedback from our customer yet!',
        });
      }

      return res.status(200).json({
        ok: true,
        data: orders,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default feedbackController;
