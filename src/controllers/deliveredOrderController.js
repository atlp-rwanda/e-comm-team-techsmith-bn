import db from '../../database/models';
import { io } from '../server';

const { order: Order, user: User, product } = db;
const logger = require('./logger');

class delivery {
  static async deliverOrder({ params }, res) {
    try {
      const { id } = params;

      const order = await Order.findOne({
        where: { id },
        include: {
          model: product,
          as: 'product',
          attributes: ['userId'],
        },
      });

      // CHECK IF THE ORDER EXISTS
      if (!order) {
        logger.orderLogger.error(
          '/PUT statusCode: 404 : Order to be delivered does not exist'
        );
        return res.status(404).json({
          message: 'Order does not exist',
        });
      }

      // CHECK IS THE SELLER OWNS THIS ORDER
      if (order.product.dataValues.userId !== res.locals.id) {
        logger.orderLogger.error(
          '/PUT statusCode: 401 : Unauthorised user tries to mark order as delivered'
        );
        return res.status(401).json({
          order,
          message: 'The products in this order does not belong to you!',
        });
      }

      // CHECK IF THE ORDER WAS PAID
      if (order.status !== 'onWay' || order.status !== 'delivered') {
        logger.orderLogger.error(
          '/PUT statusCode: 401 : User tries to mark order as deliverd twice, or mark unpaid order as delivered'
        );
        return res.status(401).json({
          message: 'Order is not yet paid or already delivered!',
        });
      }

      const deliveredOrder = await Order.update(
        { status: 'delivered' },
        {
          where: { id: params.id },
          returning: true,
          plain: true,
        }
      );

      // CHANGE THE SOCKET STATUS
      io.emit('status_change', 'Delivered');
      logger.orderLogger.info(
        '/PUT statusCode: 200 : User mark order as deliverd successfully'
      );
      return res.status(200).json({
        message:
          'Order is successfully flagged as delivered and email was sent to the Buyer',
        order: deliveredOrder.dataValues,
      });
    } catch (e) {
      logger.orderLogger.error(
        `/PUT statusCode: 500 : Marking order as delivered failed ${e.message}`
      );
      return res.status(500).json({ error: e.message });
    }
  }

  // CANCELLING DELIVERY

  static async cancelDelivery({ params }, res) {
    try {
      const { id } = params;

      const order = await Order.findOne({
        where: { id },
        include: {
          model: product,
          as: 'product',
          attributes: ['userId'],
          include: {
            model: User,
            as: 'user',
            attributes: ['name', 'email'],
          },
        },
      });

      if (!order) {
        logger.orderLogger.error(
          '/PUT statusCode: 404 : Order to be cancelled does not exist'
        );
        return res.status(404).json({ message: 'order does not exist' });
      }

      if (order.userId !== res.locals.id) {
        logger.orderLogger.warn(
          `/PUT statusCode: 401 : User tries to cancel someone's order`
        );
        return res
          .status(401)
          .json({ message: 'You can only cancely your own orders' });
      }

      const deliveredOrder = await Order.update(
        { status: 'paid' },
        {
          where: { id: params.id },
          returning: true,
          plain: true,
        }
      );

      if (!deliveredOrder) {
        logger.orderLogger.warn(
          '/PUT statusCode: 400 : Order not cancelled, reload required '
        );
        return res
          .status(400)
          .json({ error: 'Status not updated. Please reload and try again!' });
      }

      // CHANGE THE SOCKET STATUS
      io.emit('status_change', 'Cancelled');
      logger.orderLogger.info(
        '/PUT statusCode: 200 : User cancelled order succesfully'
      );
      return res.status(200).json({
        message:
          'Order is successfully marked as cancelled. check your email for confirmation',
        order: deliveredOrder.dataValues,
      });
    } catch (e) {
      logger.orderLogger.error(
        `/PUT statusCode: 500 : Cancelling order failed ${e.message}`
      );
      return res.status(500).json({ error: e.message });
    }
  }

  // DELIVERY ON THE WAY

  static async deliveryMoving({ params }, res) {
    try {
      const { id } = params;

      const order = await Order.findOne({
        where: { id },
        include: {
          model: product,
          as: 'product',
          attributes: ['userId'],
        },
      });

      // CHECK IF THE ORDER EXISTS
      if (!order) {
        logger.orderLogger.error(
          '/PUT statusCode: 404 : Order to be marked as onWay does not exist'
        );
        return res.status(404).json({
          message: 'Order does not exist',
        });
      }

      // CHECK IS THE SELLER OWNS THIS ORDER
      if (order.product.dataValues.userId !== res.locals.id) {
        logger.orderLogger.warn(
          '/PUT statusCode: 401 : Unauthorised user tries to mark order as onWay'
        );
        return res.status(401).json({
          order,
          message: 'The products in this order does not belong to you!',
        });
      }

      const deliveryMoving = await order.update(
        { status: 'onWay' },
        {
          where: {
            where: { id: params.id },
            returning: true,
            plain: true,
          },
        }
      );

      if (!deliveryMoving) {
        logger.orderLogger.error(
          '/PUT statusCode: 400 : Order not updated, reload required '
        );
        return res.status(400).json({
          message: 'Status not updated. Please reload and try again!',
        });
      }

      // CHANGE THE SOCKET STATUS
      io.emit('status_change', 'On Way');
      logger.orderLogger.warn(
        '/PUT statusCode: 200 :Order marked as onWay succesfully '
      );
      return res.status(200).json({
        message: 'Delivery successfully marked as on way',
        order: deliveryMoving.dataValues,
      });
    } catch (error) {
      logger.orderLogger.error(
        `/PUT statusCode: 500 : Updating order ${error.message}`
      );
      return res.status(500).json({ error: error.message });
    }
  }
}

export default delivery;
