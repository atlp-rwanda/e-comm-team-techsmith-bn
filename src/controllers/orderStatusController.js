import db from '../../database/models';

const { order: Order } = db;

class orderStatusController {
  static async getSingleOrder(req, res) {
    try {
      // get the order specified in params by id

      const { id } = req.params;

      const specifiedOrder = await Order.findOne({ where: { id } });

      console.log(specifiedOrder);

      
      // check if the order exists in our db with stated id
      if (!specifiedOrder) {
        return res.status(404).json({
          error: 'Order with that id not found',
        });
      }

      console.log(req.locals.id);
      console.log(specifiedOrder.userId);
      if (req.locals.id !== specifiedOrder.userId) {
        return res.status(401).json({
          message: 'You are only allowed view the status of your own order!',
        });
      }

      // return the order status to the user
      
      else(req.locals.id == specifiedOrder.userId){ return res.status(200).json({
        orderStatus: specifiedOrder.status,
      });

    }

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

export default orderStatusController;
