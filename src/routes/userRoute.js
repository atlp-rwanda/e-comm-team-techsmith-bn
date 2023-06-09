import express from 'express';
import registerUser from '../controllers/signupController.js';
import loginController from '../controllers/loginController.js';
import newsletterSubscribe from '../controllers/newsletterController.js';
import userController from '../controllers/userController.js';
import checkIsLoggedIn from '../middlewares/checkIsLoggedIn.js';
import dis_enableController from '../controllers/disEnableUser.js';
import isAdmin from '../middlewares/verifyIsAdmin.js';
import isActive from '../middlewares/activeUser.js';
import changeRole from '../controllers/roleController.js';
import wishlistController from '../controllers/wishlistController.js';
import isBuyer from '../middlewares/verifyIsBuyer.js';
import contactForm from '../controllers/contactController.js';

const router = express.Router();

// REGISTER NEW USER ROUTE
router.post('/signup', registerUser);

// Enable and disable user
router.put('/disable/:id', isAdmin, dis_enableController.disableUser);
router.put('/enable/:id', isAdmin, dis_enableController.enableUser);

// Login user route
router.post('/login', isActive, loginController.userLogin);

// TWO FACTOR AUTHENTICATION
router.get('/login/:token', loginController.twoFAController);

// GETTING A USER BY ID
router.get('/:id', userController.getUser);

// UPDATING A USER
router.put('/:id', checkIsLoggedIn, userController.updateUser);

// CHANGING ROLES OF USERS
router.put('/:id/role/:role', isAdmin, changeRole);

// REQUEST NEWSLETTER SUBSCRIPTION
router.post('/requestNewsletter', newsletterSubscribe.requestSubscription);

// CONFIRM NEWSLETTER SUBSCRIPTION
router.get(
  '/confirmNewsletter/:token',
  newsletterSubscribe.confirmSubscription
);

// Update password
router.put('/update/password', checkIsLoggedIn, userController.updatePass);

// LOGOUT USER ROUTE
router.post('/logout', userController.logoutController);

// ADD PRODUCT TO WISHLIST
router.post('/wishlist/:id', isBuyer, wishlistController.addTowishlist);

export default router;

// _____________________ADMIN ROUTES_________________________________________

// disable and enable user
router.put('/disable/:id', isAdmin, dis_enableController.disableUser);
router.put('/enable/:id', isAdmin, dis_enableController.enableUser);

// SEND A MESSAGE IN CONTACT FORM

router.post('/contact', contactForm);
