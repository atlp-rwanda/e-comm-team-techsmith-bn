import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';
import { getCookie, getToken } from '../utils/cookies.js';

// CONFIGURE DOTENV
dotenv.config();

const { user, order, payment, product } = db;
const { USER_SECRET: secret } = process.env;
const logger = require('../controllers/logger');

const validatePayment = async (req, res, next) => {
  const { id: orderId } = req.params;
  try {
    // GET COOKIE FROM REQUEST
    const cookie = getCookie(req);
    // CHECK IF COOKIE IS PRESENT
    const token = getToken(req);
    if (!cookie) {
      logger.paymentLogger.error(
        '/POST statusCode: 401 : Login required to make payment'
      );
      return res.status(401).json({
        message: 'You are not authorized to make a payment',
      });
    }
    const { role, id: userId } = jwt.verify(token, secret);
    if (Number(role) !== 3) {
      logger.userLogger.error(
        '/POST statusCode: 403 : Unauthorized user makes payment'
      );
      return res.status(403).json({
        message:
          'You are not authorized to make this payment. Only buyers can make payments',
      });
    }
    // CHECK IF ORDER EXISTS
    const findOrder = await order.findOne({ where: { id: orderId } });
    if (!findOrder) {
      logger.paymentLogger.error(
        '/POST statusCode: 404 : Order to be paid not found'
      );
      return res.status(404).json({
        message: 'Order not found',
      });
    }
    // RETRIEVE USER DETAILS
    const findUser = await user.findOne({ where: { id: userId } });
    // CHECK IF USER OWNS ORDER
    if (findOrder.userId !== userId) {
      logger.paymentLogger.error(
        '/POST statusCode: 403 : User tries to pay unauthorised order'
      );
      return res.status(403).json({
        message:
          'You are not authorized to make this payment. This order does not belong to you',
      });
    }
    // CHECK IF USER HAS PAID FOR ORDER
    const orderPaid = await payment.findOne({ where: { orderId } });
    if (orderPaid) {
      logger.userLogger.error(
        '/POST statusCode: 409 : User tries pay order twice'
      );
      return res.status(409).json({
        message: 'You have already paid for this order',
      });
    }
    // CHECK IF PRODUCT EXISTS
    const findProduct = await product.findOne({
      where: { id: findOrder.productId },
    });
    if (!findProduct) {
      logger.paymentLogger.error(
        '/POST statusCode: 404 : Product to pay not found!'
      );
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    // PASS THE VALUES TO THE CONTROLLER
    res.locals = { findUser, findOrder, orderPaid, findProduct };
    next();
  } catch (error) {
    logger.paymentLogger.error(
      `/POST statusCode: 500 : Payment failed : ${error.message}`
    );
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default validatePayment;
