import express from 'express';
import isBuyer from '../middlewares/verifyIsBuyer';
import cartController from '../controllers/cartController';
// SETUP ROUTER
const router = express.Router();
// ADDING PRODUCT TO CART
router.post('/:id', isBuyer, cartController.addToCart);
router.get('/', isBuyer, cartController.viewCart);
// EXPORT ROUTER

export default router;
