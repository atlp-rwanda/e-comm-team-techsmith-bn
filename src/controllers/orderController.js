import db from '../../database/models/index.js';
import validateQuantity from '../utils/validateQuantity.js';

const { order, product, user } = db;

const Sequelize = require('sequelize');

const { Op } = Sequelize;

class OrderController {
  // get allorders
  static async getOrders(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page, 10);
    const sizeAsNumber = Number.parseInt(req.query.size, 10);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber;
    }

    let size = 5;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    const offset = (page - 1) * size;
    try {
      const orders = await order.findAndCountAll({
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
        limit: size,
        offset,
      });
      if (orders.rows.length === 0) {
        return res
          .status(404)
          .json({ message: `There is no orders found on page ${page}` });
      }
      const totalPages = Math.ceil(orders.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;

      res.status(200).json({
        ok: true,
        message: `List of all ${orders.count} orders`,
        data: {
          totalItems: orders.count,
          totalPages,
          pageSize: size,
          currentPage,
          prevPage,
          nextPage,
          orders: orders.rows,
        },
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // Create order

  static async createOrder(req, res) {
    const { productId, desiredQuantity, amount } = req.body;
    try {
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

      // Check if there is enough products

      const validateQty = await validateQuantity(
        product,
        productId,
        desiredQuantity,
        res
      );
      if (!validateQty) {
        return res.status(400).json({
          message: `the remaining quantity in stock is low`,
        });
      }

      const newOrder = await order.create({
        productId,
        userId: res.locals.id,
        status: 'Pending',
        quantity: desiredQuantity,
        amount,
      });
      await product.update(
        { quantity: validateQty - desiredQuantity },
        { where: { id: productId } }
      );
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
    const { quantity: desiredQuantity } = req.body;
    const { oId } = req.params;
    // Getting logged in user's id
    const { id: userId } = res.locals;

    try {
      // Checking if the order exists
      const orderExists = await order.findOne({
        where: {
          [Op.and]: [
            { id: oId },
            { userId },
            { status: { [Op.ne]: 'pending' } },
          ],
        },
        include: [
          {
            model: product,
            as: 'product',
            attributes: ['id'],
          },
        ],
      });
      const previousQty = orderExists.quantity;
      const { productId } = orderExists;
      // If the order doesn't exists
      if (!orderExists) {
        return res.status(404).json({
          message: "Order doesn't exists!",
        });
      }
      const validateQty = await validateQuantity(
        product,
        orderExists.product.dataValues.id,
        desiredQuantity,
        res
      );
      if (!validateQty) {
        return res.status(400).json({
          message: `the remaining quantity in stock is low`,
        });
      }
      // If the order exists
      const updateOrder = await order.update(
        {
          quantity: desiredQuantity,
        },
        {
          where: { id: oId },
          returning: true,
        }
      );

      if (desiredQuantity > previousQty) {
        const updateQty = desiredQuantity - previousQty;

        await product.update(
          { quantity: validateQty - updateQty },
          { where: { id: productId } }
        );
      } else {
        const updateQty = previousQty - desiredQuantity;
        await product.update(
          { quantity: validateQty + updateQty },
          { where: { id: productId } }
        );
      }
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

  // SINGLE ORDER
  static async singleOrder(req, res) {
    try {
      const { orderId } = req.params;

      // THEN FIND THE USER WHOSE ID IS ORDERiD

      const singleOrder = await order.findOne({
        where: {
          userId: res.locals.id,
          id: orderId,
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

      if (!singleOrder) {
        return res.status(404).json({
          message:
            'Order does not exist! Please contact the us for further inquiries',
        });
      }

      return res.status(200).json({
        ok: true,
        message: 'Order found',
        data: singleOrder,
      });
    } catch (e) {
      return res.status(500).json({
        ok: false,
        error: e.message,
      });
    }
  }
}
export default OrderController;
