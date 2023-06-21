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
    const pageAsNumber = Number.parseInt(req.query.page, 10);
    const sizeAsNumber = Number.parseInt(req.query.size, 10);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber;
    }

    let size = 20;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    const offset = (page - 1) * size;
    try {
      // GET USER ID FROM LOCALS
      const { id: userId } = res.locals;
      // GET WISHLIST
      const wishlistProd = await wishlist.findAndCountAll({
        where: { userId },
        include: [
          {
            model: product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
        ],
        limit: size,
        offset,
      });
      const totalPages = Math.ceil(wishlistProd.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;

      if (wishlistProd.rows.length === 0) {
        return res
          .status(200)
          .json({ message: `There is no items found on page ${page}` });
      }
      // RETURN RESPONSE
      res.status(200).json({
        ok: true,
        message: `You have ${wishlistProd.count} products to your wishlist `,
        data: {
          totalItems: wishlistProd.count,
          totalPages,
          pageSize: size,
          currentPage,
          prevPage,
          nextPage,
          availableProducts: wishlistProd.rows,
        },
      });
      // CATCH ERROR
    } catch (error) {
      return res.status(500).json({
        status: 'Getting wishlist failed',
        message: error.message,
      });
    }
  }

  // GET ALL WISHLISTS
  static async getAllWishlist(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page, 10);
    const sizeAsNumber = Number.parseInt(req.query.size, 10);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber;
    }

    let size = 20;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    const offset = (page - 1) * size;
    try {
      // GET WISHLIST
      const wishlistProd = await wishlist.findAndCountAll({
        include: [
          {
            model: product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
        ],
        limit: size,
        offset,
      });
      const totalPages = Math.ceil(wishlistProd.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;

      if (wishlistProd.rows.length === 0) {
        return res
          .status(200)
          .json({ message: `There is no items found on page ${page}` });
      }
      // RETURN RESPONSE
      res.status(200).json({
        ok: true,
        message: `Products in wishlist ${wishlistProd.count} `,
        data: {
          totalItems: wishlistProd.count,
          totalPages,
          pageSize: size,
          currentPage,
          prevPage,
          nextPage,
          availableProducts: wishlistProd.rows,
        },
      });
      // CATCH ERROR
    } catch (error) {
      return res.status(500).json({
        status: 'Getting wishlist failed',
        message: error.message,
      });
    }
  }

  // DELETE SINGLE PRODUCT FROM WISHLIST
  static async deleteSingleProduct(req, res) {
    try {
      const { id: userId } = res.locals;
      const { id: productId } = req.params;

      // CHECK IF PRODUCT IS NOT AVAILABLE IN WISHLIST
      const wishlistProductExists = await wishlist.findOne({
        where: { productId, userId },
      });

      if (!wishlistProductExists) {
        return res.status(404).json({
          message: 'Product not found in wishlist',
        });
      }

      // DELETE PRODUCT FROM WISHLIST
      await wishlist.destroy({
        where: { productId, userId },
      });

      // RETURN RESPONSE
      res.status(200).json({
        ok: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
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
