import express from 'express';
import registerUser from '../controller/signupController.js';
import loginController from '../controller/loginController.js';
import newsletterSubscribe from '../controller/newsletterController.js';

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

export default router;
