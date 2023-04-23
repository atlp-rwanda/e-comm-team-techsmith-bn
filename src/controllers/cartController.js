import dotenv from 'dotenv';
import db from '../../database/models/index.js';
// CONFIG DOTENV
dotenv.config();
// IMPORT MODEL PRODUCT
const { product, cart } = db;
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
        return res.status(404).json({
          message: 'Product not found',
        });
      }
      // CHECK IF PRODUCT IS ALREADY IN CART

      const cartProductExists = await cart.findOne({
        where: { productId, userId },
      });
      if (cartProductExists) {
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
      res.status(201).json({
        message: 'Items are added successfully',
      });
      // CATCH ERROR
    } catch (error) {
      return res.status(500).json({
        status: 'Adding product into cart failed',
        message: error.message,
      });
    }
  }

  static async viewCart(req, res) {
    try {
      // Get the user ID from local variables
      const { id: userId } = res.locals;

      // Find all cart items for the user
      const cartItems = await cart.findAll({
        where: { userId },
        include: [
          {
            model: product,
            as: 'product',
            attributes: ['name', 'price', 'image'],
          },
        ],
      });

      const cartProducts = cartItems.map((item) => ({
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
      }));

      res.status(200).json({
        message: 'Cart contents retrieved successfully',
        cart: cartProducts,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Failed to retrieve cart contents',
        message: error.message,
      });
    }
  }
}

export default cartController;