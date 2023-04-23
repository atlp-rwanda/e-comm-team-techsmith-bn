import express from 'express';
import adminController from '../controllers/adminController.js';
import verifyIsAdmin from '../middlewares/verifyIsAdmin.js';
import productController from '../controllers/adminCRUDproduct.js';

const router = express.Router();

// USER REQUESTS
router.get('/users', verifyIsAdmin, adminController.getUsers);
router.delete('/users/:id', verifyIsAdmin, adminController.deleteUser);
router.post('/users', verifyIsAdmin, adminController.createUsers);
router.put('/users/:id', verifyIsAdmin, adminController.updateUser);

// PRODUCT REQUESTS
router.get('/products/:id', verifyIsAdmin, productController.findProductById);
router.get('/products', verifyIsAdmin, productController.findAllproducts);
router.delete('/products/:id', verifyIsAdmin, productController.deleteProduct);
router.post('/products', verifyIsAdmin, productController.addProduct);
router.put('/products/:id', verifyIsAdmin, productController.updateProduct);

export default router;