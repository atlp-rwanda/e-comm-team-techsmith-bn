import express from 'express';
import PaymentsController from '../controllers/paymentsController';
import isBuyer from '../middlewares/verifyIsBuyer';

// CREATE ROUTER
const router = express.Router();

// GET ALL PAYMENTS
router.get('/', isBuyer, PaymentsController.getPayments);

// DELETE PAYMENT
router.delete('/:orderId', isBuyer, PaymentsController.deletePayment);

// EXPORT ROUTER
export default router;
