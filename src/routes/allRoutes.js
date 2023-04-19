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

export default router;
