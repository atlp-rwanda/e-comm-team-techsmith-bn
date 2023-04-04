import express from 'express';
import registerUser from '../controller/signupController.js';
import loginController from '../controller/loginController.js';

const router = express.Router();

// REGISTER NEW USER ROUTE
router.post('/signup', registerUser);

// LOGIN USER ROUTE
router.post('/login', loginController);

export default router;
