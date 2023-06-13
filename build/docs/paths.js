"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _userSignup = _interopRequireDefault(require("./User/userSignup.js"));
var _resetPassword = require("./resetPassword.js");
var _userLogin = require("./User/userLogin.js");
var _userNewsletter = _interopRequireDefault(require("./User/userNewsletter.js"));
var _updatePassword = _interopRequireDefault(require("./User/updatePassword.js"));
var _order = _interopRequireDefault(require("./Order/order.js"));
var _createPayment = _interopRequireDefault(require("./Payment/createPayment.js"));
var _createProduct = _interopRequireDefault(require("./Product/createProduct.js"));
var _getProductsInStock = _interopRequireDefault(require("./Product/getProductsInStock.js"));
var _getProductsInMyStock = _interopRequireDefault(require("./Product/getProductsInMyStock.js"));
var _getAllMyProducts = _interopRequireDefault(require("./Product/getAllMyProducts.js"));
var _deleteAproduct = _interopRequireDefault(require("./Product/deleteAproduct.js"));
var _updateAproduct = _interopRequireDefault(require("./Product/updateAproduct.js"));
var _searchProduct = _interopRequireDefault(require("./Product/searchProduct.js"));
var _getProducts = require("./Product/getProducts.js");
var _updateUser = _interopRequireDefault(require("./User/updateUser.js"));
var _enableUser = _interopRequireDefault(require("./Admin/enableUser.js"));
var _disableUser = _interopRequireDefault(require("./Admin/disableUser.js"));
var _createUser = _interopRequireDefault(require("./Admin/createUser.js"));
var _getUsers = _interopRequireDefault(require("./Admin/getUsers.js"));
var _createOrder = _interopRequireDefault(require("./Order/createOrder.js"));
var _updateUser2 = _interopRequireDefault(require("./Admin/updateUser.js"));
var _deleteUser = _interopRequireDefault(require("./Admin/deleteUser.js"));
var _changeRole = _interopRequireDefault(require("./Admin/changeRole.js"));
var _getProducts2 = _interopRequireDefault(require("./Admin/getProducts.js"));
var _getASingleProduct = _interopRequireDefault(require("./Admin/getASingleProduct.js"));
var _createProduct2 = _interopRequireDefault(require("./Admin/createProduct.js"));
var _deleteProduct = _interopRequireDefault(require("./Admin/deleteProduct.js"));
var _updateProduct = _interopRequireDefault(require("./Admin/updateProduct.js"));
var _addProductToWishlist = _interopRequireDefault(require("./Wishlist/addProductToWishlist.js"));
var _updateOrder = _interopRequireDefault(require("./Order/updateOrder.js"));
var _deleteOrder = _interopRequireDefault(require("./Order/deleteOrder.js"));
var _checkExpirationOfProduct = _interopRequireDefault(require("./Product/checkExpirationOfProduct.js"));
var _delivered = _interopRequireDefault(require("./Order/delivered.js"));
var _cancelled = _interopRequireDefault(require("./Order/cancelled.js"));
var _userLogout = _interopRequireDefault(require("./User/userLogout.js"));
var _addItemInCart = _interopRequireDefault(require("./Cart/addItemInCart.js"));
var _viewItemsInCart = _interopRequireDefault(require("./Cart/viewItemsInCart.js"));
var _clearItemsInCart = _interopRequireDefault(require("./Cart/clearItemsInCart.js"));
var _createFeedback = _interopRequireDefault(require("./Feedback/createFeedback.js"));
var _getfeedbacks = _interopRequireDefault(require("./Feedback/getfeedbacks.js"));
var _getAllProductToWishlist = _interopRequireDefault(require("./Wishlist/getAllProductToWishlist.js"));
var _deleteProductToWishlist = _interopRequireDefault(require("./Wishlist/deleteProductToWishlist.js"));
var _updateItemsInCart = _interopRequireDefault(require("./Cart/updateItemsInCart.js"));
var _onWay = _interopRequireDefault(require("./Order/onWay.js"));
var _sellerStats = _interopRequireDefault(require("./Statistics/sellerStats.js"));
var _Notifications = require("./Notification/Notifications.js");
var paths = {
  // REQUEST RESET PASSWORD

  // USER LOGIN
  '/users/login': {
    post: _userLogin.loginUser
  },
  // CONFIRM TWO FACTOR AUTHENTICATION
  '/users/login/{token}': {
    get: _userLogin.twoFactorAuthentication
  },
  // USER SIGNUP
  '/users/signup': {
    post: _userSignup["default"]
  },
  '/password/requestReset': {
    post: _resetPassword.requestReset
  },
  // CONFIRM RESET PASSWORD
  '/password/resetPassword/{token}': {
    post: _resetPassword.passwordReset
  },
  // REQUEST NEWSLETTER SUBSCRIPTION
  '/users/requestNewsletter': {
    post: _userNewsletter["default"]
  },
  // CONFIRM NEWSLETTER SUBSCRIPTION
  '/users/update/password': {
    put: _updatePassword["default"]
  },
  // _______________ ORDERS _________________________
  '/orders': {
    get: _order["default"],
    post: _createOrder["default"]
  },
  '/orders/{oId}': {
    put: _updateOrder["default"],
    "delete": _deleteOrder["default"]
  },
  '/orders/delivered/{id}': {
    put: _delivered["default"]
  },
  '/orders/cancelled/{id}': {
    put: _cancelled["default"]
  },
  '/orders/onWay/{id}': {
    put: _onWay["default"]
  },
  // GOOGLE AUTHENTICATION
  '/auth/google': {
    get: _userLogin.loginUser
  },
  // CREATE ORDER PAYMENT
  '/orders/{id}/checkout': {
    post: _createPayment["default"]
  },
  '/products': {
    post: _createProduct["default"],
    get: _getProducts.getProducts
  },
  // ALL PRODUCTS IN MY COLLECTION
  '/products/myStock': {
    get: _getAllMyProducts["default"]
  },
  // AVAILABLE PRODUCTS IN STOCK
  '/products/inStock': {
    get: _getProductsInStock["default"]
  },
  // AVAILABLE PRODUCTS IN COLLECTON
  '/products/inMyStock': {
    get: _getProductsInMyStock["default"]
  },
  '/products/{id}': {
    put: _updateAproduct["default"]
  },
  '/products/{pId}': {
    "delete": _deleteAproduct["default"]
  },
  '/products/search': {
    post: _searchProduct["default"]
  },
  '/products/getProduct/{id}': {
    get: _getProducts.getProductById
  },
  '/products/mySingleProduct/{id}': {
    get: _getProducts.getOneFromMine
  },
  // UPDATE USER
  '/users/{id}': {
    put: _updateUser["default"]
  },
  // ENABLE AND DISABLE USER
  '/users/enable/{id}': {
    put: _enableUser["default"]
  },
  '/users/disable/{id}': {
    put: _disableUser["default"]
  },
  // Admin crud
  '/admin': {
    post: _createUser["default"],
    get: _getUsers["default"]
  },
  '/admin/{id}': {
    put: _updateUser2["default"],
    "delete": _deleteUser["default"]
  },
  // ADMIN CRUD PRODUCTS
  '/admin/products': {
    get: _getProducts2["default"],
    post: _createProduct2["default"]
  },
  '/admin/products/{id}': {
    put: _updateProduct["default"],
    "delete": _deleteProduct["default"],
    get: _getASingleProduct["default"]
  },
  // changing user's roles by admin
  '/users/{id}/role/{role}': {
    put: _changeRole["default"]
  },
  // adding product to wishlist
  '/wishlist/{id}': {
    post: _addProductToWishlist["default"]
  },
  '/wishlist/': {
    get: _getAllProductToWishlist["default"],
    "delete": _deleteProductToWishlist["default"]
  },
  '/products/expired': {
    get: _checkExpirationOfProduct["default"]
  },
  // LOGOUT
  '/users/logout': {
    post: _userLogout["default"]
  },
  // ADDING ITEMS IN CART
  '/cart/{id}': {
    post: _addItemInCart["default"],
    put: _updateItemsInCart["default"]
  },
  // VIEWING AND CLEARING ITEMS IN CART
  '/cart/': {
    get: _viewItemsInCart["default"],
    "delete": _clearItemsInCart["default"]
  },
  // ADDING FEEDBACK ON PRODUCT
  '/feedback/{pId}': {
    get: _getfeedbacks["default"],
    post: _createFeedback["default"]
  },
  '/statistics/seller': {
    post: _sellerStats["default"]
  },
  /**
   *  NOTIFICATION
   */
  // GET ALL NOTIFICATIONS
  '/notify': {
    get: _Notifications.getAll
  },
  // GET UNREAD NOTIFICATIONS
  '/notify/unread': {
    get: _Notifications.getUnread
  },
  // MARK NOTIFICATION AS READ
  '/notify/read': {
    get: _Notifications.readAll
  },
  // READ AND DELETE A SINGLE NOTIFICATION
  '/notify/{id}': {
    put: _Notifications.readSingle,
    "delete": _Notifications.deleteSingle
  }
};
var _default = paths;
exports["default"] = _default;