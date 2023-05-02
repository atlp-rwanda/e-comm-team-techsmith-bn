import moment from 'moment';
import dotenv from 'dotenv';
import db from '../../database/models/index.js';

dotenv.config();

const { order, product } = db;

class sellerStatisticsController {
  static async productStatus(req, res) {
    const feeCharged = 0.1;

    // const available
    try {
      const { id: sellerId } = res.locals;
      let { start, end } = req.body;
      if (!end) end = new Date();
      else {
        end = moment();
      }

      if (!start) start = moment().subtract(1, 'month');
      else {
        start = new Date(start);
      }
      const filteredProduct = await product.findAll({
        where: {
          userId: sellerId,
          createdAt: {
            [db.Sequelize.Op.between]: [start, end],
          },
        },
      });
      const results = [];
      /* eslint-disable  */
      for (let index = 0; index < filteredProduct.length; index++) {
        const result = await order.findOne({
          where: {
            productId: filteredProduct[index].dataValues.id,
          },
          include:{
            model:product,
            as:"product",
            attributes:['name']
          }
        });
        if (result !== null) {
          results.push(result);
        }
      }
      
      const numOrders = results.length;
      const paidProduct=[]
      for (let index = 0; index < results.length; index++) {
        if (results[index].dataValues.status === "Paid") {
          paidProduct.push(results[index]);
        }
      }
      // Calculate the metrics
      const totalRevenue = await paidProduct.reduce(
        (total, orders) => total + orders.amount,
        0
      );
      
      const productSold = await paidProduct.reduce((total) => total + 1, 0);
      const moneyMade = (await totalRevenue) - totalRevenue * feeCharged;
      const topSellingProduct = paidProduct.reduce((products, orders) => {
        const newProduct = {id: orders.productId, name: `${orders.product.dataValues.name}`, productQuantity: orders.quantity};
        return [...products, newProduct];
      }, [])
      .sort((a, b) => b.productQuantity - a.productQuantity)
      .slice(0, 3);
      return await res.status(200).json({
        numOrders,
        totalRevenue,
        productSold,
        moneyMade,
        topSellingProduct,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
export default sellerStatisticsController;
