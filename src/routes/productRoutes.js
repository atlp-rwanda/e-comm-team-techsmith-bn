import express from 'express';
import ProductController from '../controllers/productController';
import isSeller from '../middlewares/verifyIsSeller';

// SETUP ROUTER
const router = express.Router();

// GET ALL PRODUCTS
router.get('/', ProductController.findAllproducts);
router.get('/allAvailable', ProductController.allAvailableProducts);
router.get('/available', isSeller, ProductController.availableProducts);
router.get('/myCollection', isSeller, ProductController.myCollectionProducts);

// CREATE SINGLE PRODUCT
router.post('/', isSeller, ProductController.addProduct);

export default router;
