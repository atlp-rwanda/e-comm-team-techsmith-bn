import express from 'express';
import ProductController from '../controllers/productController.js';
import isSeller from '../middlewares/verifyIsSeller';
import checkIsLoggedIn from '../middlewares/checkIsLoggedIn.js';

// SETUP ROUTER
const router = express.Router();

// GET ALL PRODUCTS
router.get('/', checkIsLoggedIn, ProductController.findAllproducts);
router.get('/inStock', ProductController.allAvailableProducts);
router.get('/inMyStock', isSeller, ProductController.availableProducts);
router.get('/myStock', isSeller, ProductController.myCollectionProducts);

// CREATE SINGLE PRODUCT
router.post('/', isSeller, ProductController.addProduct);

// GET EXPIRED PRODUCTS
router.get('/expired', ProductController.expirationOfProducts);

// GET SINGLE PRODUCT
router.get('/:id', ProductController.findProductById);

// UPDATE PRODUCT
router.put('/:id', isSeller, ProductController.updateProduct);

// DELETE PRODUCT
router.delete('/:pId', isSeller, ProductController.deleteProduct);

// SEARCH PRODUCT
router.post('/search', ProductController.getProduct);

export default router;
