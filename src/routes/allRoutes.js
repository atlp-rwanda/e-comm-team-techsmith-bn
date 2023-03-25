import express from 'express';
import swaggerRoute from './swaggerRoute';

// SETUP ROUTER
const router = express.Router();

// SETUP ROUTES
router.use('/docs', swaggerRoute);

export default router;
