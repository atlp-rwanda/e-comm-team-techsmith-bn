import db from '../../database/models/index.js';

const { order, product, user } = db;

const Sequelize = require('sequelize');

const { Op } = Sequelize;

class OrderController {
  // get allorders
  static async getOrders(req, res) {
    try {
      const orders = await order.findAll({
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
      res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async createOrder(req, res) {
    const { productId, userId, quantity, amount } = req.body;
    try {
      // Checking if the user is logged in
      if (!res.locals) {
        return res.status(401).json({
          message: 'Make sure you are logged in!',
        });
      }

      // Check if the product exists and is available
      const checkProduct = await product.findOne({
        where: { id: productId, isAvailable: true },
      });

      if (!checkProduct) {
        return res.status(404).json({
          ok: false,
          message: 'Product not found!',
        });
      }

      // Check if the product is already booked
      const checkOrder = await order.findOne({
        where: { productId },
      });

      if (checkOrder) {
        return res.status(404).json({
          ok: false,
          message: 'Product already booked!',
        });
      }

      // Checking if its the authorized user

      if (res.locals.id !== userId) {
        return res.status(401).json({
          ok: false,
          message: 'You can not place an order for someone else!',
        });
      }

      const newOrder = await order.create({
        productId,
        userId,
        status: 'Pending',
        quantity,
        amount,
      });

      return res.status(201).json({
        ok: true,
        message: 'Order created successfully',
        data: newOrder,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }

  static async updateOrder(req, res) {
    const { quantity } = req.body;
    const { oId } = req.params;
    // Getting logged in user's id
    const { id: userId } = res.locals;
    try {
      // Checking if the order exists
      const orderExists = await order.findOne({
        where: {
          [Op.and]: [{ id: oId }, { userId }, { status: { [Op.ne]: 'paid' } }],
        },
      });

      // If the order doesn't exists
      if (!orderExists) {
        return res.status(404).json({
          message: "Order doesn't exists!",
        });
      }

      // If the order exists
      const updateOrder = await order.update(
        {
          quantity,
        },
        {
          where: { id: oId },
          returning: true,
        }
      );

      // Checking if its updated
      if (updateOrder) {
        return res.status(200).json({
          ok: true,
          message: 'Order successfully updated!',
        });
      }
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }

  static async deleteOrder(req, res) {
    const { oId } = req.params;

    // Getting logged in user's id
    const { id: userId } = res.locals;

    // Checking if the order exists
    const orderExists = await order.findOne({
      where: {
        [Op.and]: [{ id: oId }, { userId }],
      },
    });

    if (!orderExists) {
      return res.status(404).json({
        message: "Order doesn't exists!",
      });
    }
    // Deleting the Order
    const deleteOrder = await order.destroy({ where: { id: oId } });

    // Checking if its deleted
    if (deleteOrder) {
      return res.status(200).json({
        ok: true,
        message: 'Order successfully deleted',
      });
    }
    return res.status(400).json({
      ok: false,
      message: 'Not deleted!',
    });
  }
}
export default OrderController;
