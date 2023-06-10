import express from 'express';
import CategoryController from '../controllers/categoryController';

const router = express.Router();

router.get('/', CategoryController.fetchAllCategories);
router.get('/:id', CategoryController.getCategoryById);

export default router;
