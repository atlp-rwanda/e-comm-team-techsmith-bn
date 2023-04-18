import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import validateProductInput from '../utils/productValidation.js';
import validateProductSearchInput from '../utils/productSearch.js';

const Sequelize = require('sequelize');

const { Op } = Sequelize;
// CONFIG DOTENV
dotenv.config();

// IMPORT MODEL PRODUCT
const { product } = db;

class ProductController {
  static async addProduct(req, res) {
    const {
      name,
      price,
      categoryId,
      image,
      description,
      expiryDate,
      condition,
    } = req.body;
    const { id } = res.locals;
    /* eslint-disable no-console */
    console.log(
      id,
      name,
      price,
      categoryId,
      image,
      description,
      expiryDate,
      condition
    );
    try {
      const duplicateProduct = await product.findOne({
        where: { name, userId: id },
      });
      const { error } = validateProductInput(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      if (duplicateProduct) {
        return res.status(409).json({
          message: 'The product already exist, You can update its details only',
          data: duplicateProduct,
        });
      }
      // ELSE CREATE NEW PRODUCT
      const newProduct = await product.create({
        userId: id,
        name,
        price,
        categoryId,
        description,
        isAvailable: true,
        expiryDate,
        image,
        condition,
      });
      return res.status(201).json({
        ok: true,
        message: 'Product created successfully',
        data: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Adding product failed',
        message: error.message,
      });
    }
  }

  static async findAllproducts(req, res) {
    try {
      const products = await product.findAll();
      if (products.length <= 0) {
        return res.status(404).json({
          ok: false,
          message: 'You have no product in your collection',
        });
      }
      return res.status(200).json({
        ok: true,
        message: ` ${products.length} products found`,
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Getting product failure',
        message: error.message,
      });
    }
  }

  static async getProduct(req, res) {
    // IMPORT MODEL PRODUCT

    const { name, price, categoryIds } = req.body;

    const { errors } = validateProductSearchInput(req.body);

    if (errors) {
      return res.status(400).json({ message: errors.details[0].message });
    }

    const token = req.headers.cookie;

    if (!token) {
      try {
        if (name === null && price === null && categoryIds === null) {
          console.log('hereshdvshfcvjxbkj.knasbhjgdhs');
          const products = await product.findAll();

          if (products.length <= 0) {
            res.status(404).json({
              status: 'None',
              message: 'no product found',
            });
          } else {
            res.status(200).json({
              status: 'lIST OF PRODUCTS',
              message: ` ${products.length} products found`,
              data: products,
            });
          }
        } else {
          console.log(name, price, categoryIds);
          const products = await product.findAll({
            where: {
              [Op.or]: [
                { name: { [Op.like]: `%${name}%` } },
                { categoryId: categoryIds },
                { price },
              ],
            },
          });

          if (products.length <= 0) {
            res.status(404).json({
              status: 'None',
              message: 'no product found',
            });
          } else {
            res.status(200).json({
              status: 'lIST OF PRODUCTS',
              message: ` ${products.length} products found`,
              data: products,
            });
          }
        }
      } catch (error) {
        console.log(error);
        res
          .status(500)
          .json({ status: 'Getting product failure', message: error });
      }
    }
    // else {
    //   try {
    //     if (name === null && price === null && categoryIds === null) {
    //       const products = await product.findAll({ where: { userId: req.id } });

    //       if (products.length <= 0) {
    //         res.status(404).json({
    //           status: 'None',
    //           message: 'no product found',
    //         });
    //       } else {
    //         res.status(200).json({
    //           status: 'lIST OF PRODUCTS',
    //           message: ` ${products.length} products found`,
    //           data: products,
    //         });
    //       }
    //     }

    //     const products = await product.findAll({
    //       where: {
    //         userId: req.id,
    //         [Op.or]: [
    //           { name: { [Op.like]: `%${name}%` } },
    //           { categoryId: categoryIds },
    //           { price },
    //         ],
    //       },
    //     });

    //     if (products.length <= 0) {
    //       res.status(404).json({
    //         status: 'None',
    //         message: 'no product found',
    //       });
    //     } else {
    //       res.status(200).json({
    //         status: 'lIST OF PRODUCTS',
    //         message: ` ${products.length} products found`,
    //         data: products,
    //       });
    //     }
    //   } catch (error) {
    //     res
    //       .status(500)
    //       .json({ status: 'Getting product failure', message: error.message });
    //   }
    // }
  }
}
export default ProductController;
