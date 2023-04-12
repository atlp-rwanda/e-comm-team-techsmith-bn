import express from 'express';
import adminController from '../controllers/adminController.js';
import verifyIsAdmin from '../middlewares/verifyIsAdmin.js';

const router = express.Router();

router.get('/users', verifyIsAdmin, adminController.getUsers);
router.delete('/users/:id', verifyIsAdmin, adminController.deleteUser);
router.post('/users', verifyIsAdmin, adminController.createUsers);
router.put('/users/:id', verifyIsAdmin, adminController.updateUser);

export default router;
