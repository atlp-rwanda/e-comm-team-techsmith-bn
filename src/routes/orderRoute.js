import express from 'express';
import validatePayment from '../middlewares/validatePayment';
import PaymentsController from '../controllers/paymentsController';
import orderController from '../controllers/orderController.js';
import verifyIsAdmin from '../middlewares/verifyIsAdmin.js';

const router = express.Router();

// CREATE A NEW PAYMENT
router.post('/:id/pay', validatePayment, PaymentsController.createPayment);

// GET ALL ORDERS
router.get('/', verifyIsAdmin, orderController.getOrders);

export default router;
