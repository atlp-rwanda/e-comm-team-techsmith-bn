import express from 'express';
import isBuyer from '../middlewares/verifyIsBuyer';
import cartController from '../controllers/cartController';

const router = express.Router();
// ADDING PRODUCT TO CART
router.post('/:id', isBuyer, cartController.addToCart);
router.get('/', isBuyer, cartController.viewCart);
router.delete('/', isBuyer, cartController.clearCart);
router.delete('/:id', isBuyer, cartController.deleteSingleItem);
router.put('/:id', isBuyer, cartController.updateCart);
// EXPORT ROUTER

export default router;
