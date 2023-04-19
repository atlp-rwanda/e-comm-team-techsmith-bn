import express from 'express';
import addProductController from '../controllers/addProductToWishlistController';
import isBuyer from '../middlewares/verifyIsBuyer.js';

// SETUP ROUTER
const router = express.Router();

// ADDING PRODUCT TO CART
router.post('/:id', isBuyer, addProductController.addTowishlist);

// EXPORT ROUTER
export default router;
