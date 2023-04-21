import express from 'express';
import wishlistController from '../controllers/wishlistController';
import isBuyer from '../middlewares/verifyIsBuyer';

// CREATE ROUTER
const router = express.Router();

// ADD PRODUCT TO WISHLIST
router.post('/:id', isBuyer, wishlistController.addTowishlist);

export default router;
