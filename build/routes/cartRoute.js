"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _verifyIsBuyer = _interopRequireDefault(require("../middlewares/verifyIsBuyer"));
var _cartController = _interopRequireDefault(require("../controllers/cartController"));
var router = _express["default"].Router();
// ADDING PRODUCT TO CART
router.post('/:id', _verifyIsBuyer["default"], _cartController["default"].addToCart);
router.get('/', _verifyIsBuyer["default"], _cartController["default"].viewCart);
router["delete"]('/', _verifyIsBuyer["default"], _cartController["default"].clearCart);
router["delete"]('/:id', _verifyIsBuyer["default"], _cartController["default"].deleteSingleItem);
router.put('/:id', _verifyIsBuyer["default"], _cartController["default"].updateCart);
// EXPORT ROUTER
var _default = router;
exports["default"] = _default;