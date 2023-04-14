import express from 'express';
import validatePayment from '../middlewares/validatePayment';
import PaymentsController from '../controllers/paymentsController';
import OrderController from '../controllers/orderController.js';
import verifyIsAdmin from '../middlewares/verifyIsAdmin.js';
import orderStatusController from '../controllers/orderStatusController.js';
import verifyIsBuyer from '../middlewares/verifyIsBuyer';

const router = express.Router();

// CREATE A NEW PAYMENT
router.post('/:id/pay', validatePayment, PaymentsController.createPayment);

// GET ALL ORDERS
router.get('/', verifyIsAdmin, OrderController.getOrders);

// GET SINGLE ORDERS
router.get('/single/:id', verifyIsBuyer, orderStatusController.getSingleOrder);
export default router;
