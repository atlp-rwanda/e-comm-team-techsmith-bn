import express from 'express';
import addProductController from '../controllers/cartController';
import isBuyer from '../middlewares/verifyIsBuyer';
// SETUP ROUTER
const router = express.Router();
// ADDING PRODUCT TO CART
router.post('/:id', isBuyer, addProductController.addToCart);
// EXPORT ROUTER
export default router;
