import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import validateProductInput from '../utils/productValidation.js';

// CONFIG DOTENV
dotenv.config();
class productController {
  static async addProduct(req, res) {
    try {
      // IMPORT MODEL PRODUCT
      const { product } = db;
      const {
        name,
        price,
        categoryId,
        image,
        description,
        expiryDate,
        condition,
      } = req.body;
      const duplicateProduct = await product.findOne({
        where: { name, userId: req.id },
      });
      const { error } = validateProductInput(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      if (duplicateProduct) {
        return res.status(403).json({
          message: 'The product already exist, You can update its details only',
          data: duplicateProduct,
        });
      }
      // ELSE CREATE NEW PRODUCT
      const newProduct = await product.create({
        userId: req.id,
        name,
        price,
        categoryId,
        description,
        expiryDate,
        image,
        condition,
      });
      return res.status(201).json({
        ok: true,
        message: 'product create successful',
        data: newProduct,
      });
      // }
    } catch (error) {
      res
        .status(500)
        .json({ status: 'Adding product failed', message: error.message });
    }
  }

  static async findAllproducts(req, res) {
    try {
      const { product } = db;

      const products = await product.findAll({
        // userID TO BE RETRIEVED FROM THE TOKEN
        where: { userId: req.id },
      });
      if (products.length <= 0) {
        res.status(404).json({
          status: 'None',
          message: 'You have no product in your collection',
        });
      } else {
        res.status(200).json({
          status: 'lIST OF PRODUCTS',
          message: ` ${products.length} products found`,
          data: products,
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ status: 'Getting product failure', message: error.message });
    }
  }
}
export default productController;
