import dotenv from 'dotenv';
import { Worker } from 'worker_threads';
import db from '../../database/models/index.js';

// CONFIG DOTENV
dotenv.config();

// IMPORT MODEL PRODUCT
const { product, wishlist, user } = db;

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
      // CHECK IF PRODUCT IS ALREADY IN CART
      const wishlistProductExists = await wishlist.findOne({
        where: { productId, userId },
      });
      if (wishlistProductExists) {
        return res.status(409).json({
          message: 'Product already in wishlist',
        });
      }
      // CREATE WISHLIST
      const wishlistProd = await wishlist.create(
        {
          productId,
          userId,
        },
        {
          include: [
            {
              model: user,
              as: 'user',
              attributes: ['id', 'name', 'email'], // list of attributes you want to retrieve
            },
          ],
        }
      );
      // CREATE WORKER
      const returnUser = new Worker('./src/workers/wishlist.js');
      // SEND MESSAGE TO WORKER
      returnUser.postMessage(userId);
      // LISTEN FOR MESSAGE FROM WORKER
      let workerUser;
      returnUser.on('message', (userOwner) => {
        workerUser = userOwner;
      });

      // RETURN RESPONSE
      res.status(201).json({
        message: 'add product into wishlist successfully',
        data: wishlistProd,
        user: workerUser,
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
            attributes: ['id', 'name', 'price', 'image'],
          },
        ],
      });
      // RETURN RESPONSE
      res.status(200).json({
        message: 'Your wishlist products',
        data: wishlistProd,
      });
      // CATCH ERROR
    } catch (error) {
      return res.status(500).json({
        status: 'Getting wishlist failed',
        message: error.message,
      });
    }
  }
}
export default wishlistController;
