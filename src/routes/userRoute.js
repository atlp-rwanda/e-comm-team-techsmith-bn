import express from 'express';
import registerUser from '../controllers/signupController.js';
import loginController from '../controllers/loginController.js';
import newsletterSubscribe from '../controllers/newsletterController.js';
import userController from '../controllers/userController.js';

const router = express.Router();

// REGISTER NEW USER ROUTE
router.post('/signup', registerUser);

// LOGIN USER ROUTE
router.post('/login', loginController);

// REQUEST NEWSLETTER SUBSCRIPTION
router.post('/request-newsletter', newsletterSubscribe.requestSubscription);

// CONFIRM NEWSLETTER SUBSCRIPTION
router.get(
  '/confirm-newsletter/:token',
  newsletterSubscribe.confirmSubscription
);

// Updating password
router.put('/update-password', userController.updatePass);

export default router;
