import express from 'express';
import registerUser from '../controller/signupController.js';
import loginController from '../controller/loginController.js';
import dis_enableController from '../controller/dis_enableController.js';
import newsletterSubscribe from '../controller/newsletterController.js';
import verifyIsdisabled from '../middlewares/verifyIsdisabled.js';
import verifyIsAdmin from '../middlewares/verifyIsAdmin.js';

const router = express.Router();

// REGISTER NEW USER ROUTE
router.post('/signup', registerUser);

// LOGIN USER ROUTE
router.post('/login', verifyIsdisabled, loginController);
router.put('/disable/:id', verifyIsAdmin, dis_enableController.disableUser);
router.put('/enable/:id', verifyIsAdmin, dis_enableController.enableUser);

// REQUEST NEWSLETTER SUBSCRIPTION
router.post('/request-newsletter', newsletterSubscribe.requestSubscription);

// CONFIRM NEWSLETTER SUBSCRIPTION
router.get(
  '/confirm-newsletter/:token',
  newsletterSubscribe.confirmSubscription
);

export default router;
