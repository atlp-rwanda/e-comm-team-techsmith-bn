import dotenv from 'dotenv';
import db from '../../database/models/index.js';

// CONFIG DOTENV
dotenv.config();

// IMPORT MODEL PRODUCT
const { product, wishlist } = db;

class addProductController {
  static async addTowishlist(req, res) {
    try {
      // GET PRODUCT ID FROM PATH
      const { id: productId } = req.params;
      /* eslint-disable no-console */
      console.log(productId);
      // GET USER ID FROM LOCALS
      const { id: userId } = res.locals;
      // CHECK IF PRODUCT IS NOT AVAILABLE
      const prod = await product.findOne({ where: { id: productId } });
      // CHECK IF PRODUCT IS NOT AVAILABLE
      if (!prod) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      // CHECK IF PRODUCT IS ALREADY IN CART
      const wishlistProductExists = await wishlist.findOne({
        where: { productId, userId },
      });
      if (wishlistProductExists) {
        return res.status(409).json({
          message: 'Product already in wishlist',
        });
      }
      // CREATE CART
      const wishlistProd = await wishlist.create({
        productId,
        userId,
      });
      // RETURN RESPONSE
      res.status(201).json({
        message: 'add product into wishlist successfully',
        data: wishlistProd,
      });
      // CATCH ERROR
    } catch (error) {
      return res.status(500).json({
        status: 'Adding product into wishlist failed',
        message: error.message,
      });
    }
  }
}
export default addProductController;