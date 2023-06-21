import express from 'express';
import wishlistController from '../controllers/wishlistController';
import isBuyer from '../middlewares/verifyIsBuyer';

// CREATE ROUTER
const router = express.Router();

// ADD PRODUCT TO WISHLIST
router.post('/:id', isBuyer, wishlistController.addTowishlist);
router.get('/', isBuyer, wishlistController.getWishlist);
router.delete('/', isBuyer, wishlistController.deleteWishlist);
router.delete('/:id', isBuyer, wishlistController.deleteSingleProduct);

export default router;
