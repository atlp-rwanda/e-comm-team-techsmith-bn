// hound-ignore
import express from 'express';
import swaggerRoute from './swaggerRoute.js';
import userRoute from './userRoute.js';
import sampleRoute from './sampleRoute.js';
import callbackRoute from './auth.js';
import orderRoute from './orderRoute.js';
import productRoute from './productRoutes.js';

// SETUP ROUTER
const router = express.Router();

// SETUP ROUTES
router.use('/docs', swaggerRoute);
router.use('/users', userRoute);
router.use('/sample_test', sampleRoute);
router.use('/auth', callbackRoute);
router.use('/orders', orderRoute);

router.use('/product', productRoute);
export default router;
