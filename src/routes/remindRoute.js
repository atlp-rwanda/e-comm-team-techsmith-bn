import express from 'express';
import remindUserToChangePassword from '../middlewares/resetPasswordReminder.js';
// SETUP ROUTER
const router = express.Router();

// GET ALL PRODUCTS
router.get('/', remindUserToChangePassword);

export default router;
