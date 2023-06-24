import db from '../../database/models/index.js';
import { getPagination, getPagingData } from '../utils/pagination.js';
import validateQuantity from '../utils/validateQuantity.js';

const { order, product, user } = db;

const Sequelize = require('sequelize');
const logger = require('./logger');

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
        logger.orderLogger.error(
          '/GET statusCode: 404 : No order found on page'
        );
        return res
          .status(404)
          .json({ message: `There is no orders found on page ${page}` });
      }
      const totalPages = Math.ceil(orders.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;
      logger.orderLogger.info(
        '/GET statusCode: 200 : Orders fetched successfully'
      );
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
      logger.orderLogger.error(
        `/GET statusCode: 500 : Fetching product in collection failed : ${error.message}`
      );
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
        logger.productLogger.error('/POST statusCode: 404 : Product not found');
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
        logger.orderLogger.error(
          '/POST statusCode: 400 : User require more quantity than in Qty in the stock'
        );
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
      logger.orderLogger.info('/POST statusCode: 404 : Product not found');
      return res.status(201).json({
        ok: true,
        message: 'Order created successfully',
        data: newOrder,
      });
    } catch (error) {
      logger.orderLogger.info(
        `/POST statusCode: 500 : Making order failed: ${error.message}`
      );
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
            {
              status: {
                [Op.ne]: 'pending',
              },
            },
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
        logger.orderLogger.error(`/PUT statusCode: 404 : order not found `);
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
        logger.orderLogger.error(
          `/PUT statusCode: 400 : User require more Qty than in stock `
        );
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
        logger.orderLogger.info(
          `/PUT statusCode: 404 : Order successfully updated `
        );
        return res.status(200).json({
          ok: true,
          message: 'Order successfully updated!',
        });
      }
    } catch (error) {
      logger.orderLogger.error(
        `/PUT statusCode: 500 : Placing order failed : ${error.message} `
      );
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }

  static async deleteOrder(req, res) {
    const { oId } = req.params;
    try {
      // Getting logged in user's id
      const { id: userId } = res.locals;

      // Checking if the order exists
      const orderExists = await order.findOne({
        where: {
          [Op.and]: [{ id: oId }, { userId }],
        },
      });

      if (!orderExists) {
        logger.orderLogger.error('/DELETE statusCode: 404 :Order not found ');
        return res.status(404).json({
          message: "Order doesn't exists!",
        });
      }
      // Deleting the Order
      const deleteOrder = await order.destroy({ where: { id: oId } });

      // Checking if its deleted
      if (deleteOrder) {
        logger.orderLogger.error(
          '/DELETE statusCode: 200 :Order successful deleted '
        );
        return res.status(200).json({
          ok: true,
          message: 'Order successfully deleted',
        });
      }
      logger.orderLogger.error('/DELETE statusCode: 400 :Order not deleted ');
      return res.status(400).json({
        ok: false,
        message: 'Not deleted!',
      });
    } catch (error) {
      logger.orderLogger.error(
        `/DELETE statusCode: 400 :Deleting order failed :${error.message}`
      );
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
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
            attributes: ['name', 'image', 'price', 'quantity'],
          },
        ],
      });

      if (!singleOrder) {
        logger.orderLogger.error('/GET statusCode: 404 :Order not found ');
        return res.status(404).json({
          message:
            'Order does not exist! Please contact the us for further inquiries',
        });
      }
      logger.orderLogger.info('/GET statusCode: 404 :Specific order found ');
      return res.status(200).json({
        ok: true,
        message: 'Order found',
        data: singleOrder,
      });
    } catch (e) {
      logger.orderLogger.error(
        '/GET statusCode: 500 : Getting single order failed'
      );
      return res.status(500).json({
        ok: false,
        error: e.message,
      });
    }
  }

  // GET ALL ORDERS OF A USER
  static async userOrders(req, res) {
    try {
      const { id: userId } = res.locals;
      const { page, size } = req.query;

      const { limit } = getPagination(page, size);

      const userOrders = await order.findAndCountAll({
        where: {
          userId,
        },
        limit,
        include: [
          {
            model: user,
            as: 'user',
            attributes: ['name', 'email', 'telephone'],
          },
          {
            model: product,
            as: 'product',
            attributes: [
              'name',
              'categoryId',
              'price',
              'image',
              'description',
              'quantity',
            ],
          },
        ],
      });

      if (!userOrders) {
        logger.orderLogger.error('/GET statusCode: 404 :Order not found ');
        return res.status(404).json({
          message:
            'Order does not exist! Please contact the us for further inquiries',
        });
      }
      logger.orderLogger.info('/GET statusCode: 404 :Specific order found ');
      return res.status(200).json({
        ok: true,
        message: 'Order found',
        data: getPagingData(userOrders, page, limit),
      });
    } catch (e) {
      logger.orderLogger.error(
        '/GET statusCode: 500 : Getting single order failed'
      );
      return res.status(500).json({
        ok: false,
        error: e.message,
      });
    }
  }
}
export default OrderController;
