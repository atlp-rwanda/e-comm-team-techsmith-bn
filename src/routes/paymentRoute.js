import express from 'express';
import PaymentsController from '../controllers/paymentsController';
import isBuyer from '../middlewares/verifyIsBuyer';

// CREATE ROUTER
const router = express.Router();

// GET ALL PAYMENTS
router.get('/', isBuyer, PaymentsController.getPayments);

// EXPORT ROUTER
export default router;
