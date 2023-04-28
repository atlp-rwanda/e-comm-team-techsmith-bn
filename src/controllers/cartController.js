import dotenv from 'dotenv';
import db from '../../database/models/index.js';

// CONFIG DOTENV
dotenv.config();
// IMPORT MODEL PRODUCT
const { product, cart } = db;
const logger = require('./logger');

class cartController {
  static async addToCart(req, res) {
    try {
      // GET PRODUCT ID FROM PATH
      const { id: productId } = req.params;
      // GET USER ID FROM LOCALS
      const { id: userId } = res.locals;
      // CHECK IF PRODUCT IS NOT AVAILABLE
      const prod = await product.findOne({ where: { id: productId } });

      // CHECK IF PRODUCT IS NOT AVAILABLE
      if (!prod) {
        logger.cartLogger.error(
          '/POST statusCode: 404 :Item not found in stock '
        );
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      // CHECK IF PRODUCT IS ALREADY IN CART

      const cartProductExists = await cart.findOne({
        where: { productId, userId },
      });
      if (!cartProductExists === false) {
        logger.cartLogger.error(
          '/POST statusCode: 409 :Duolicated fund in cart '
        );
        return res.status(409).json({
          message: 'Product already in cart',
        });
      }
      // CREATE CART
      await cart.create({
        userId,
        productId,
      });

      // RETURN RESPONSE
      logger.cartLogger.info(
        '/POST statusCode: 201 :Item added in cart succesfully '
      );
      res.status(201).json({
        message: 'Items are added successfully',
      });
      // CATCH ERROR
    } catch (error) {
      logger.cartLogger.error(
        `/POST statusCode: 500 :Adding Item in cart failed: ${error.message} `
      );
      return res.status(500).json({
        status: 'Adding product into cart failed',
        message: error.message,
      });
    }
  }

  static async viewCart(req, res) {
    const pageAsNumber = Number.parseInt(req.query.page, 10);
    const sizeAsNumber = Number.parseInt(req.query.size, 10);

    let page = 1;
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
      page = pageAsNumber;
    }

    let size = 5;
    if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
      size = sizeAsNumber;
    }
    const offset = (page - 1) * size;
    try {
      // Get the user ID from local variables
      const { id: userId } = res.locals;

      // Find all cart items for the user
      const cartItems = await cart.findAndCountAll({
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

      const totalPages = Math.ceil(cartItems.count / size);
      const currentPage = page > totalPages ? totalPages : page;
      const prevPage = currentPage === 1 ? null : currentPage - 1;
      const nextPage = currentPage === totalPages ? null : currentPage + 1;

      const cartProducts = cartItems.rows.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
      }));
      logger.cartLogger.info(
        '/GET statusCode: 200 : Retrieved content in cart'
      );
      res.status(200).json({
        ok: true,
        message: `All ${cartItems.count} Cart contents retrieved successfully`,
        data: {
          totalItems: cartItems.count,
          totalPages,
          pageSize: size,
          currentPage,
          prevPage,
          nextPage,
          itemsInCart: cartProducts,
        },
      });
    } catch (error) {
      logger.cartLogger.error(
        `/GET statusCode: 500 : Fetching product in cart failed : ${error.message}`
      );
      return res.status(500).json({
        status: 'Failed to retrieve cart contents',
        message: error.message,
      });
    }
  }

  static async clearCart(req, res) {
    try {
      const { id: userId } = res.locals;

      // DELETING THE ITEMS
      await cart.destroy({
        where: { userId },
      });
      logger.cartLogger.info(
        '/DELETE statusCode: 200 : Cart cleared succesfully'
      );
      res.status(200).json({
        message: 'Cart cleared successfully',
      });
    } catch (error) {
      logger.cartLogger.error('/DELETE statusCode: 500 : Clear cart failed');
      return res.status(500).json({
        status: 'Failed to clear cart',
        message: error.message,
      });
    }
  }

  static async updateCart(req, res) {
    try {
      const { id: userId } = res.locals;
      // FETCHING THE PRODUCT ID AND NEW QUANTITY
      const { desiredQuantity } = req.body;
      const { id: productId } = req.params;
      // VALIDATING THE QUANTITY
      const { quantity } = await product.findOne({
        where: {
          id: productId,
        },
      });
      if (desiredQuantity > quantity) {
        logger.cartLogger.info(
          '/PUT  :User required more quantity than in stock'
        );
        return res.json({
          Message: `The remaining quantity in stock is ${quantity}`,
        });
      }
      // FETCHING THE ITEM
      const cartItem = await cart.findOne({
        where: { productId, userId },
        include: [
          {
            model: product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
        ],
      });

      if (!cartItem) {
        logger.cartLogger.error('/PUT statusCode: 404 : Cart item not found');
        return res.status(404).json({
          message: 'Cart item not found',
        });
      }

      // CALCULATING THE NEW TOTAL
      const totalPrice = desiredQuantity * cartItem.product.price;

      // UPDATING THE QUANTITY
      await cartItem.update({ quantity: desiredQuantity, totalPrice });
      // RETRIEVING THE UPDATED CART
      const updatedCartItem = await cart.findOne({
        where: { productId, userId },
        include: [
          {
            model: product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
        ],
      });

      const cartItems = [updatedCartItem].map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        image: item.product.image,
      }));
      // console.log(updatedCartItem.desiredQuantity)
      logger.cartLogger.info(
        '/PUT statusCode: 200 : Cart item updated succesfully'
      );
      res.status(200).json({
        message: 'Cart item updated successfully',
        cart: cartItems,
      });
    } catch (error) {
      logger.cartLogger.info(
        `/PUT statusCode: 500 : Updating cart failed : ${error.message}`
      );
      return res.status(500).json({
        status: 'Failed to update cart item',
        message: error.message,
      });
    }
  }
}

export default cartController;
