import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';
import { getCookie, getToken } from '../utils/cookies.js';

// CONFIGURE DOTENV
dotenv.config();

const { user, order, payment, product } = db;
const { USER_SECRET: secret } = process.env;

const validatePayment = async (req, res, next) => {
  const { id: orderId } = req.params;
  try {
    // GET COOKIE FROM REQUEST
    const cookie = getCookie(req);
    // CHECK IF COOKIE IS PRESENT
    const token = getToken(req);
    if (!cookie) {
      return res.status(401).json({
        message: 'You are not authorized to make a payment',
      });
    }
    const { role, id: userId } = jwt.verify(token, secret);
    if (Number(role) !== 3) {
      return res.status(403).json({
        message:
          'You are not authorized to make this payment. Only buyers can make payments',
      });
    }
    // CHECK IF ORDER EXISTS
    const findOrder = await order.findOne({ where: { id: orderId } });
    if (!findOrder) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }
    // CHECK IF USER EXISTS
    const findUser = await user.findOne({ where: { id: userId } });
    // CHECK IF USER OWNS ORDER
    if (findOrder.userId !== userId) {
      return res.status(403).json({
        message:
          'You are not authorized to make this payment. This order does not belong to you',
      });
    }
    // CHECK IF USER HAS PAID FOR ORDER
    const orderPaid = await payment.findOne({ where: { orderId } });
    if (orderPaid) {
      return res.status(409).json({
        message: 'You have already paid for this order',
      });
    }
    // CHECK IF PRODUCT EXISTS
    const findProduct = await product.findOne({
      where: { id: findOrder.productId },
    });
    if (!findProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }
    // PASS THE VALUES TO THE CONTROLLER
    res.locals = { findUser, findOrder, orderPaid, findProduct };
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default validatePayment;
