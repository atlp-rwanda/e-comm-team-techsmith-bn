// hound-ignore
import express from 'express';
import swaggerRoute from './swaggerRoute.js';
import userRoute from './userRoute.js';
import resetPasswordRoute from './resetPasswordRoute.js';
import sampleRoute from './sampleRoute.js';
import callbackRoute from './auth.js';
import orderRoute from './orderRoute.js';
import productRoute from './productRoutes.js';
import adminRoute from './adminRoute.js';

// SETUP ROUTER
const router = express.Router();

// SETUP ROUTES
router.use('/docs', swaggerRoute);
router.use('/users', userRoute);
router.use('/password', resetPasswordRoute);
router.use('/sample_test', sampleRoute);
router.use('/auth', callbackRoute);
router.use('/orders', orderRoute);
router.use('/admin', adminRoute);

router.use('/product', productRoute);
export default router;
