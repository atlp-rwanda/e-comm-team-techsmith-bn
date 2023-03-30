import express from 'express';
import registerUser from '../controller/signupController.js';

const router = express.Router();

// REGISTER NEW USER ROUTE
router.post('/signup', registerUser);

export default router;
