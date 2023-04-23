import db from '../../database/models/index.js';

const { order, product, user } = db;

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
    const { quantity, amount } = req.body;
    const { oId, uId } = req.params;
    try {
      // Checking id the user is logged in as a buyer
      if (!res.locals) {
        return res.status(401).json({
          message: 'Make sure you are logged in!',
        });
      }

      // Checking if he is the owner of the order
      if (res.locals.id !== Number(uId)) {
        return res.status(401).json({
          message: "Unauthorized to update someone else's order!",
        });
      }

      // Checking if the order exists
      const orderExists = await order.findOne({ where: { id: oId } });

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
          amount,
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
    const { oId, uId } = req.params;
    // Checking if the user is logged in
    if (!res.locals) {
      return res.status(401).json({
        message: 'Make sure you are logged in!',
      });
    }
    // Getting logged in user's id
    const { id } = res.locals;

    // Checking if he is the owner of the order
    if (id !== Number(uId)) {
      return res.status(401).json({
        message: "Unauthorized to delete someone else's order!",
      });
    }

    // Checking if the order exists
    const orderExists = await order.findOne({ where: { id: oId } });

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
