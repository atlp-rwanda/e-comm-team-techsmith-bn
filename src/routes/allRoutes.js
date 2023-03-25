import express from 'express';
import swaggerRoute from './swaggerRoute.js';
import userRoute from './userRoute.js';

// SETUP ROUTER
const router = express.Router();

// SETUP ROUTES
router.use('/docs', swaggerRoute);
router.use('/users', userRoute);

export default router;
