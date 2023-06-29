import dotenv from 'dotenv';
import { getPagination, getPagingData } from '../utils/pagination';
import db, { Sequelize } from '../../database/models/index';

// CONFIGURE DOTENV
dotenv.config();

// LOAD MODELS
const { user, product } = db;

class SellerContainer {
  static async getAllSellers(req, res) {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    try {
      const sellers = await user.findAndCountAll({
        where: { roleId: 2 },
        limit,
        offset,
        include: [
          {
            model: product,
            as: 'products',
            attributes: ['id', 'categoryId'],
          },
        ],
        exclude: ['password', 'createdAt', 'updatedAt'],
        group: ['user.id'],
      });
      return res.status(200).json({
        status: 'success',
        message: 'All sellers fetched successfully',
        data: getPagingData(sellers, page, limit),
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async getSeller(req, res) {
    const { id } = req.params;

    try {
      const seller = await user.findOne({
        where: { id, roleId: 2 },
        include: [
          {
            model: product,
            as: 'products',
            attributes: [],
          },
        ],
        attributes: [
          'id',
          'name',
          'email',
          'physicalAddress',
          'gender',
          'roleId',
          'preferredCurrency',
          'birthDate',
          [
            Sequelize.fn('COUNT', Sequelize.col('products.id')),
            'totalProducts',
          ],
        ],
        group: ['user.id'],
        raw: true,
      });
      if (!seller) {
        return res.status(404).json({
          status: 'error',
          message: 'Seller not found',
        });
      }
      return res.status(200).json({
        message: 'Seller fetched successfully',
        data: seller,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default SellerContainer;
