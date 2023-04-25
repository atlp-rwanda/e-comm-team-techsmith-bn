import express from 'express';
import validatePayment from '../middlewares/validatePayment';
import PaymentsController from '../controllers/paymentsController';
import OrderController from '../controllers/orderController.js';
import verifyIsAdmin from '../middlewares/verifyIsAdmin.js';
import delivery from '../controllers/deliveredOrderController.js';
import isBuyer from '../middlewares/verifyIsBuyer';

const router = express.Router();

// CREATE A NEW PAYMENT
router.post('/:id/pay', validatePayment, PaymentsController.createPayment);

// GET ALL ORDERS
router.get('/', verifyIsAdmin, OrderController.getOrders);

// FLAG ORDER AS DELIVERED
router.put('/delivered/:id', verifyIsAdmin, delivery.deliverOrder);
router.put('/cancelled/:id', verifyIsAdmin, delivery.cancelDelivery);

// CREATING ORDER
router.post('/', isBuyer, OrderController.createOrder);

// UPDATING ORDER
router.put('/:oId', isBuyer, OrderController.updateOrder);

// DELETEING ORDER
router.delete('/:oId', isBuyer, OrderController.deleteOrder);

export default router;
