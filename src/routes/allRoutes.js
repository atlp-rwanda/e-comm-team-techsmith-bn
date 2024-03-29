// hound-ignore
import express from 'express';
import swaggerRoute from './swaggerRoute.js';
import userRoute from './userRoute.js';
import resetPasswordRoute from './resetPasswordRoute.js';
import callbackRoute from './auth.js';
import orderRoute from './orderRoute.js';
import productRoute from './productRoutes.js';
import adminRoute from './adminRoute.js';
import wishlistRoute from './wishlistRoute.js';
import cartRoute from './cartRoute.js';
import paymentRouter from './paymentRoute.js';
import feedbackroute from './reviewRoute.js';
import sellerStatisticsRouter from './sellerStatisticsRoute.js';
import notificationRouter from './notificationRoute.js';
import categoryRoute from './categoryRoute.js';
import sellerRoute from './sellerRoute.js';
import chatRoutes from './chatRoutes.js';

// SETUP ROUTER
const router = express.Router();

// SETUP ROUTES
router.use('/docs', swaggerRoute);
router.use('/users', userRoute);
router.use('/password', resetPasswordRoute);
router.use('/auth', callbackRoute);
router.use('/orders', orderRoute);
router.use('/admin', adminRoute);
router.use('/products', productRoute);
router.use('/wishlist', wishlistRoute);
router.use('/cart', cartRoute);
router.use('/payments', paymentRouter);
router.use('/feedback', feedbackroute);
router.use('/statistics', sellerStatisticsRouter);
router.use('/notify', notificationRouter);
router.use('/category', categoryRoute);
router.use('/sellers', sellerRoute);
router.use('/chat', chatRoutes);

export default router;
