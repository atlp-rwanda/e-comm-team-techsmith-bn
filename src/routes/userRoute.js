import express from 'express';
import registerUser from '../controller/signupController.js';
import loginController from '../controller/loginController.js';
import dis_enableController from '../controller/dis_enableController.js';

const router = express.Router();

// REGISTER NEW USER ROUTE
router.post('/signup', registerUser);

// LOGIN USER ROUTE
router.post('/login', loginController);
router.post('/disable/:id',dis_enableController.disableUser)
router.post('/enable/:id',dis_enableController.enableUser )

// REQUEST NEWSLETTER SUBSCRIPTION
router.post('/request-newsletter', newsletterSubscribe.requestSubscription);

// CONFIRM NEWSLETTER SUBSCRIPTION
router.get(
  '/confirm-newsletter/:token',
  newsletterSubscribe.confirmSubscription
);

export default router;
