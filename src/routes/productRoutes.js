import express from 'express';
import ProductController from '../controllers/productController';
import isSeller from '../middlewares/verifyIsSeller';

// SETUP ROUTER
const router = express.Router();

// GET ALL PRODUCTS
router.get('/', ProductController.findAllproducts);

// CREATE SINGLE PRODUCT
router.post('/', isSeller, ProductController.addProduct);

export default router;
