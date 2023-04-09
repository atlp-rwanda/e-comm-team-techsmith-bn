import express from 'express';

import orderController from '../controller/orderController.js';
import verifyIsAdmin from '../middleware/verifyIsAdmin.js';

const router = express.Router();

router.get('/', verifyIsAdmin, orderController.getOrders);

export default router;
