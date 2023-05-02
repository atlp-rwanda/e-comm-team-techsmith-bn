import express from 'express';
import isSeller from '../middlewares/verifyIsSeller';
import sellerStatisticsController from '../controllers/sellerStatistics.js';

const router = express.Router();

router.post('/seller', isSeller, sellerStatisticsController.productStatus);

export default router;
