import express from 'express';
import ProductController from '../controllers/productController.js';
import addProductController from '../controllers/addProductToWishlistController.js';
import isSeller from '../middlewares/verifyIsSeller';
import isBuyer from '../middlewares/verifyIsBuyer';

// SETUP ROUTER
const router = express.Router();

// GET ALL PRODUCTS
router.get('/', ProductController.findAllproducts);

// CREATE SINGLE PRODUCT
router.post('/', isSeller, ProductController.addProduct);

// ADDING PRODUCT TO CART
router.post('/wishlist/:id', isBuyer, addProductController.addTowishlist);

export default router;
