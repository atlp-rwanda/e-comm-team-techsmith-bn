import express from 'express';
import adminController from '../controllers/adminController.js';
import verifyIsAdmin from '../middlewares/verifyIsAdmin.js';

const router = express.Router();

router.get('/', adminController.getUsers);
router.delete('/:id', verifyIsAdmin, adminController.deleteUser);
router.post('/', verifyIsAdmin, adminController.createUsers);
router.put('/:id', verifyIsAdmin, adminController.updateUser);

export default router;
