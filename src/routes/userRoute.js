import express from 'express';
import registerUser from '../controller/signupController.js';
import loginController from '../controller/loginController.js';
import newsletterSubscribe from '../controller/newsletterController.js';
import userController from '../controller/userController.js';

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

// LOGOUT USER ROUTE
router.post('/logout', userController.logoutController);

export default router;
