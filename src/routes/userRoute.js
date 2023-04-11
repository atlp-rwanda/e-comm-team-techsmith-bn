import express from 'express';
import registerUser from '../controllers/signupController.js';
import loginController from '../controllers/loginController.js';
import newsletterSubscribe from '../controllers/newsletterController.js';
import userController from '../controllers/userController.js';
import checkIsLoggedIn from '../middlewares/checkIsLoggedIn.js';
import dis_enableController from '../controllers/disEnableUser.js';
import ensureIsAdmin from '../middlewares/verifyIsAdmin.js';
import ensureIsEnabled from '../middlewares/ensureIsEnabled.js';

const router = express.Router();

// REGISTER NEW USER ROUTE
router.post('/signup', registerUser);

// enable and disable user
router.put('/disable/:id', ensureIsAdmin, dis_enableController.disableUser);
router.put('/enable/:id', ensureIsAdmin, dis_enableController.enableUser);

// LOGIN USER ROUTE
router.post('/login', ensureIsEnabled, loginController.userLogin);

// TWO FACTOR AUTHENTICATION
router.get('/login/:token', loginController.twoFAController);

// GETTTING ALL USERS
router.get('/', userController.getUsers);

// GETTING A USER BY ID
router.get('/:id', userController.getUser);

// UPDATING A USER
router.put('/:id', checkIsLoggedIn, userController.updateUser);

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
