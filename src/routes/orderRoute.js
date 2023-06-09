import express from 'express';
import validatePayment from '../middlewares/validatePayment';
import PaymentsController from '../controllers/paymentsController';
import OrderController from '../controllers/orderController.js';
import isAdmin from '../middlewares/verifyIsAdmin.js';
import delivery from '../controllers/deliveredOrderController.js';
import isBuyer from '../middlewares/verifyIsBuyer.js';
import isSeller from '../middlewares/verifyIsSeller';
import { io } from '../server';

const router = express.Router();

// CREATE A NEW PAYMENT
router.post('/:id/checkout', validatePayment, PaymentsController.createPayment);

// MAKE MULTIPLE PAYMENTS
router.post('/checkout', isBuyer, PaymentsController.createBulkPayment);

// GET ALL ORDERS
router.get('/', isAdmin, OrderController.getOrders);

// GET SINGLE ORDER
router.get('/single/:orderId', isBuyer, OrderController.singleOrder);

// FLAG ORDER AS DELIVERED
router.put('/delivered/:id', isSeller, delivery.deliverOrder);
router.put('/cancelled/:id', isBuyer, delivery.cancelDelivery);
router.put('/onWay/:id', isSeller, delivery.deliveryMoving);

// CREATING ORDER
router.post('/', isBuyer, OrderController.createOrder);

router.get('/status', (req, res) => res.render('status'));

// GET SINGLE ORDER
router.get('/single/:orderId', isBuyer, OrderController.singleOrder);

// FLAG ORDER AS DELIVERED
router.put('/delivered/:id', isAdmin, delivery.deliverOrder);
router.put('/cancelled/:id', isAdmin, delivery.cancelDelivery);

// CREATING ORDER
router.post('/', isBuyer, OrderController.createOrder);

// UPDATING ORDER
router.put('/:oId', isBuyer, OrderController.updateOrder);

// DELETING ORDER
router.delete('/:oId', isBuyer, OrderController.deleteOrder);

// GET ALL ORDERS FOR A USER
router.get('/user', isBuyer, OrderController.userOrders);

router.get('/stat', (req, res) => {
  io.emit('hello_mess', 'Hello there I am io');
  res.send({ message: 'sent' });
});

router.get('/status', (req, res) => {
  res.render('status');
});

export default router;
