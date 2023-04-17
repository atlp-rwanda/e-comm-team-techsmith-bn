import db from '../../database/models';
import {
  nodeMail,
  deliveredOrderMessage,
  cancelledOrderMessage,
} from '../utils/emails';

// this controller changes the status of a certain order to deliverd or shipped

const { order: Order, user: User } = db;

class delivery {
  static async deliverOrder({ params }, res) {
    try {
      const { id } = params;

      const order = await Order.findOne({ where: { id } });

      // see if the user for that order still exists in our database
      const user = await User.findOne({ where: { id: order.userId } });

      if (!id || !order || order.status !== 'payed' || !user) {
        return res.status(404).json({
          message:
            'Please provide a valid id. Make sure you are not trying to deliver the same order more than once',
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

      if (!deliveredOrder) {
        return res
          .status(400)
          .json({ error: 'Status not updated please try again' });
      }

      // FIND THE NAME AND EMAIL OF THE ORDER BUYER AND SEND HIM AN EMAIL

      await nodeMail(
        user.email,
        user.name,
        'YOUR ORDER IS BEING DELIVERED',
        deliveredOrderMessage
      );

      return res.status(200).json({
        message:
          'Order is successfully flagged as delivered and email was sent to the Buyer',
        order: deliveredOrder[1],
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  static async cancelDelivery({ params }, res) {
    try {
      const { id } = params;

      const order = await Order.findOne({ where: { id } });

      // see if the user for that order still exists in our database
      const user = await User.findOne({ where: { id: order.userId } });

      if (!id || !order || !user) {
        return res.status(404).json({
          message:
            'Please provide a valid id. Make sure to delete this order if the user nologer exists on our lists.',
        });
      }

      const deliveredOrder = await Order.update(
        { status: 'payed' },
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

      // FIND THE NAME AND EMAIL OF THE ORDER BUYER AND SEND HIM AN EMAIL

      await nodeMail(
        user.email,
        user.name,
        'YOUR ORDER IS BEING DELIVERED',
        cancelledOrderMessage
      );

      return res.status(200).json({
        message:
          'Order is successfully marked as cancelled and email was sent to the Buyer',
        order: deliveredOrder[1],
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }
}

export default delivery;
