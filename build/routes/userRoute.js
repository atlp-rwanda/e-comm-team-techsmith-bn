"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _signupController = _interopRequireDefault(require("../controllers/signupController.js"));
var _loginController = _interopRequireDefault(require("../controllers/loginController.js"));
var _newsletterController = _interopRequireDefault(require("../controllers/newsletterController.js"));
var _userController = _interopRequireDefault(require("../controllers/userController.js"));
var _checkIsLoggedIn = _interopRequireDefault(require("../middlewares/checkIsLoggedIn.js"));
var _disEnableUser = _interopRequireDefault(require("../controllers/disEnableUser.js"));
var _verifyIsAdmin = _interopRequireDefault(require("../middlewares/verifyIsAdmin.js"));
var _activeUser = _interopRequireDefault(require("../middlewares/activeUser.js"));
var _roleController = _interopRequireDefault(require("../controllers/roleController.js"));
var _wishlistController = _interopRequireDefault(require("../controllers/wishlistController.js"));
var _verifyIsBuyer = _interopRequireDefault(require("../middlewares/verifyIsBuyer.js"));
var router = _express["default"].Router();

// REGISTER NEW USER ROUTE
router.post('/signup', _signupController["default"]);

// Enable and disable user
router.put('/disable/:id', _verifyIsAdmin["default"], _disEnableUser["default"].disableUser);
router.put('/enable/:id', _verifyIsAdmin["default"], _disEnableUser["default"].enableUser);

// Login user route
router.post('/login', _activeUser["default"], _loginController["default"].userLogin);

// TWO FACTOR AUTHENTICATION
router.get('/login/:token', _loginController["default"].twoFAController);

// GETTING A USER BY ID
router.get('/:id', _userController["default"].getUser);

// UPDATING A USER
router.put('/:id', _checkIsLoggedIn["default"], _userController["default"].updateUser);

// CHANGING ROLES OF USERS
router.put('/:id/role/:role', _verifyIsAdmin["default"], _roleController["default"]);

// REQUEST NEWSLETTER SUBSCRIPTION
router.post('/requestNewsletter', _newsletterController["default"].requestSubscription);

// CONFIRM NEWSLETTER SUBSCRIPTION
router.get('/confirmNewsletter/:token', _newsletterController["default"].confirmSubscription);

// Update password
router.put('/update/password', _checkIsLoggedIn["default"], _userController["default"].updatePass);

// LOGOUT USER ROUTE
router.post('/logout', _userController["default"].logoutController);

// ADD PRODUCT TO WISHLIST
router.post('/wishlist/:id', _verifyIsBuyer["default"], _wishlistController["default"].addTowishlist);
var _default = router; // _____________________ADMIN ROUTES_________________________________________
// disable and enable user
exports["default"] = _default;
router.put('/disable/:id', _verifyIsAdmin["default"], _disEnableUser["default"].disableUser);
router.put('/enable/:id', _verifyIsAdmin["default"], _disEnableUser["default"].enableUser);