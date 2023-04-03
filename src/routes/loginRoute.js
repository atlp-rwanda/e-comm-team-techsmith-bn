import express from 'express';
import loginController from '../controller/loginController.js';

const router = express.Router();

router.post('/', loginController);

export default router;
