import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import validateProductInput from '../utils/productValidation.js';

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
}
export default ProductController;
