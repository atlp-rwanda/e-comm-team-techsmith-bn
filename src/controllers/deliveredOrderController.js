import db from '../../database/models';
import { io } from '../server';

const { order: Order, user: User, product } = db;

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
        return res.status(404).json({
          message: 'Order does not exist',
        });
      }

      // CHECK IS THE SELLER OWNS THIS ORDER
      if (order.product.dataValues.userId !== res.locals.id) {
        return res.status(401).json({
          order,
          message: 'The products in this order does not belong to you!',
        });
      }

      // CHECK IF THE ORDER WAS PAID
      if (order.status !== 'paid') {
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

      return res.status(200).json({
        message:
          'Order is successfully flagged as delivered and email was sent to the Buyer',
        order: deliveredOrder.dataValues,
      });
    } catch (e) {
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
        return res.status(404).json({ message: 'order does not exist' });
      }

      if (order.userId !== res.locals.id) {
        console.log(order.product.dataValues.userId);
        console.log(res.locals.id);
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
        return res
          .status(400)
          .json({ error: 'Status not updated. Please reload and try again!' });
      }

      // CHANGE THE SOCKET STATUS
      io.emit('status_change', 'Cancelled');

      return res.status(200).json({
        message:
          'Order is successfully marked as cancelled. check your email for confirmation',
        order: deliveredOrder.dataValues,
      });
    } catch (e) {
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
        return res.status(404).json({
          message: 'Order does not exist',
        });
      }

      // CHECK IS THE SELLER OWNS THIS ORDER
      if (order.product.dataValues.userId !== res.locals.id) {
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
        return res.status(400).json({
          message: 'Status not updated. Please reload and try again!',
        });
      }

      // CHANGE THE SOCKET STATUS
      io.emit('status_change', 'On Way');

      return res.status(200).json({
        message: 'Delivery successfully marked as on way',
        order: deliveryMoving.dataValues,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default delivery;
