import db from '../../database/models/index.js';
import { getPagination, getPagingData } from '../utils/pagination.js';

const Sequelize = require('sequelize');

const { Op } = Sequelize;

const { review, order, product, payment, user } = db;
const logger = require('./logger');

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
        logger.feedbackLogger.error(
          '/POST statusCode: 404 : No feedback made, user need to make order'
        );
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
        logger.feedbackLogger.error(
          '/POST statusCode: 404 : No feedback made, user need to make payment'
        );
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
      logger.feedbackLogger.info(
        '/POST statusCode: 201 :  feedback received successfully'
      );
      return res.status(201).json({
        ok: true,
        message: 'Thanks for your feedback!',
        data: saveReview,
      });
    } catch (error) {
      logger.feedbackLogger.error(
        `/POST statusCode: 500 : No feedback made: ${error.message} `
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // GETTING FEEDBACK ON A PRODUCT
  static async allFeedback(req, res) {
    const { pId } = req.params;
    const { size, page } = req.query;
    const { limit } = getPagination(page, size || 10);

    try {
      // CHECKING IF PRODUCT EXISTS
      const checkProduct = await product.findOne({
        where: { id: pId },
      });
      if (!checkProduct) {
        logger.productLogger.error('/GET statusCode: 404 : Item not found ');
        return res.status(404).json({
          message: 'Product does not exists!',
        });
      }

      // CHECKING IF ANY USER HAS MADE AN ORDER ON THAT PRODUCT
      const paymentConfirmation = await order.findOne({
        where: { productId: pId },
      });
      if (!paymentConfirmation) {
        logger.feedbackLogger.error(
          '/GET statusCode: 404 : No feedback found, product never been purchased'
        );
        return res.status(404).json({
          message: 'The product has never been purchased',
        });
      }

      const orders = await review.findAndCountAll({
        where: { productId: pId },
        limit,
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
        logger.feedbackLogger.info(
          '/GET statusCode: 200 : No feedback from customer found'
        );
        return res.status(200).json({
          ok: true,
          message: 'We have no feedback from our customer yet!',
        });
      }
      logger.feedbackLogger.info(
        '/GET statusCode: 200 : Feedback fetched sucessfully'
      );
      return res.status(200).json({
        ok: true,
        data: getPagingData(orders, page, limit),
      });
    } catch (error) {
      logger.productLogger.error(
        ` / GET statusCode: 500: Fetching feedbacks failed: ${error.message}`
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default feedbackController;
