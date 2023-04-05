import express from 'express';
import swaggerRoute from './swaggerRoute.js';
import userRoute from './userRoute.js';
import resetPasswordRoute from './resetPasswordRoute.js';
import sampleRoute from './sampleRoute.js';

// SETUP ROUTER
const router = express.Router();

// SETUP ROUTES
router.use('/docs', swaggerRoute);
router.use('/users', userRoute);
router.use('/password', resetPasswordRoute);
router.use('/sample_test', sampleRoute);

export default router;
