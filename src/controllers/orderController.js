import db from '../../database/models/index.js';

const { order } = db;

class orderController {
  // get allusers
  static async getOrders(req, res) {
    try {
      const orders = await order.findAll();
      res.status(200).json({ orders });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}
export default orderController;
