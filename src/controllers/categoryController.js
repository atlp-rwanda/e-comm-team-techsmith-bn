import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import { getPagination, getPagingData } from '../utils/pagination.js';

// LOAD MODELS FROM DB
const { product, category } = db;

// CONFIGURE DOTENV
dotenv.config();

class CategoryController {
  // FETCH ALL CATEGORIES
  static async fetchAllCategories(req, res) {
    try {
      const categories = await category.findAll({});
      return res.status(200).json({
        status: 'success',
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // GET ALL PRODUCTS IN A CATEGORY
  static async getCategoryById(req, res) {
    const { page, size } = req.query;

    const { limit, offset } = getPagination(page, size);

    const { id } = req.params;

    try {
      // FETCH ALL PRODUCTS IN A SINGLE CATEGORY
      const products = await product.findAndCountAll({
        where: { categoryId: id },
        limit,
        offset,
        include: [
          {
            model: category,
            as: 'categories',
            attributes: ['name'],
          },
        ],
      });

      // WHEN CATEGORY IS NOT FOUND
      if (!products) {
        return res.status(404).json({
          message: 'Category not found',
        });
      }

      // WHEN CATEGORY IS FOUND
      return res.status(200).json({
        message: 'Category retrieved successfully',
        data: getPagingData(products, page, limit),
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default CategoryController;
