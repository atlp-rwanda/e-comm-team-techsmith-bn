import express from 'express';
import ProductController from '../controllers/productController.js';
import addProductController from '../controllers/addProductToWishlistController.js';
import isSeller from '../middlewares/verifyIsSeller';
import isBuyer from '../middlewares/verifyIsBuyer';

// SETUP ROUTER
const router = express.Router();

// GET ALL PRODUCTS
router.get('/', ProductController.findAllproducts);
router.get('/allAvailable', ProductController.allAvailableProducts);
router.get('/available', isSeller, ProductController.availableProducts);
router.get('/myCollection', isSeller, ProductController.myCollectionProducts);

// CREATE SINGLE PRODUCT
router.post('/', isSeller, ProductController.addProduct);
router.get('/expiration', ProductController.expirationOfProducts);

// ADDING PRODUCT TO CART
router.post('/wishlist/:id', isBuyer, addProductController.addTowishlist);

// DELETE A SPECIFIC PRODUCT
router.delete('/:pId', isSeller, ProductController.deleteProduct);

// UPDATE A SPECIFIC PRODUCT
router.put('/editProduct/:pId', isSeller, ProductController.updateProduct);

export default router;
