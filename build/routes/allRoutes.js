"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _swaggerRoute = _interopRequireDefault(require("./swaggerRoute.js"));
var _userRoute = _interopRequireDefault(require("./userRoute.js"));
var _resetPasswordRoute = _interopRequireDefault(require("./resetPasswordRoute.js"));
var _auth = _interopRequireDefault(require("./auth.js"));
var _orderRoute = _interopRequireDefault(require("./orderRoute.js"));
var _productRoutes = _interopRequireDefault(require("./productRoutes.js"));
var _adminRoute = _interopRequireDefault(require("./adminRoute.js"));
var _wishlistRoute = _interopRequireDefault(require("./wishlistRoute.js"));
var _cartRoute = _interopRequireDefault(require("./cartRoute.js"));
var _paymentRoute = _interopRequireDefault(require("./paymentRoute.js"));
var _reviewRoute = _interopRequireDefault(require("./reviewRoute.js"));
var _sellerStatisticsRoute = _interopRequireDefault(require("./sellerStatisticsRoute.js"));
var _notificationRoute = _interopRequireDefault(require("./notificationRoute.js"));
var _categoryRoute = _interopRequireDefault(require("./categoryRoute.js"));
// hound-ignore

// SETUP ROUTER
var router = _express["default"].Router();

// SETUP ROUTES
router.use('/docs', _swaggerRoute["default"]);
router.use('/users', _userRoute["default"]);
router.use('/password', _resetPasswordRoute["default"]);
router.use('/auth', _auth["default"]);
router.use('/orders', _orderRoute["default"]);
router.use('/admin', _adminRoute["default"]);
router.use('/products', _productRoutes["default"]);
router.use('/wishlist', _wishlistRoute["default"]);
router.use('/cart', _cartRoute["default"]);
router.use('/payments', _paymentRoute["default"]);
router.use('/feedback', _reviewRoute["default"]);
router.use('/statistics', _sellerStatisticsRoute["default"]);
router.use('/notify', _notificationRoute["default"]);
router.use('/category', _categoryRoute["default"]);
var _default = router;
exports["default"] = _default;