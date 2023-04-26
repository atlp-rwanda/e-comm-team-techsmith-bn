import dotenv from 'dotenv';
import db from '../../database/models/index.js';

// CONFIG DOTENV
dotenv.config();

// IMPORT MODEL PRODUCT
const { product, wishlist } = db;

// IMPORT SEQUELIZE
const { Op } = require('sequelize');

class wishlistController {
  // ADD TO WISHLIST
  static async addTowishlist(req, res) {
    try {
      // USER
      // GET PRODUCT ID FROM PATH
      const { id: productId } = req.params;
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
      const wishlistProductExists = await wishlist.findOne({
        where: {
          [Op.and]: [
            { productId: { [Op.eq]: productId } },
            { userId: { [Op.eq]: userId } },
          ],
        },
      });

      // CHECK IF PRODUCT IS ALREADY IN CART
      if (!wishlistProductExists === false) {
        return res.status(409).json({
          message: 'Product already in wishlist',
        });
      }

      // CREATE WISHLIST
      await wishlist.create({
        productId,
        userId,
      });

      // RETURN RESPONSE
      res.status(201).json({
        message: 'Product added successfully',
      });
      // CATCH ERROR
    } catch (error) {
      return res.status(500).json({
        status: 'Adding product into wishlist failed',
        message: error.message,
      });
    }
  }

  // GET WISHLIST
  static async getWishlist(req, res) {
    try {
      // GET USER ID FROM LOCALS
      const { id: userId } = res.locals;
      // GET WISHLIST
      const wishlistProd = await wishlist.findAll({
        where: { userId },
        include: [
          {
            model: product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
        ],
      });
      // RETURN RESPONSE
      res.status(200).json({
        message: 'Your wishlist products',
        wishlist: wishlistProd,
      });
      // CATCH ERROR
    } catch (error) {
      return res.status(500).json({
        status: 'Getting wishlist failed',
        message: error.message,
      });
    }
  }

  // DELETING THE WISHLIST
  static async deleteWishlist(req, res) {
    try {
      const { id: userId } = res.locals;
      await wishlist.destroy({
        where: { userId },
      });
      res.status(200).json({
        message: 'wishlist deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Failed to delete wishlist',
        message: error.message,
      });
    }
  }
}
export default wishlistController;
