import express from 'express';
import productController from '../controllers/productController';
import isActive from '../middlewares/isActiveUser.js';

// SETUP ROUTER
const router = express.Router();
router.get('/allProduct', isActive, productController.findAllproducts);
router.post('/addProduct', isActive, productController.addProduct);
export default router;
