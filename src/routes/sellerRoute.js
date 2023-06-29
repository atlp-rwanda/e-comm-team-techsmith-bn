import express from 'express';
import SellerContainer from '../controllers/sellerContainer';

// SET UP ROUTER
const router = express.Router();

router.get('/', SellerContainer.getAllSellers);
router.get('/:id', SellerContainer.getSeller);

export default router;
