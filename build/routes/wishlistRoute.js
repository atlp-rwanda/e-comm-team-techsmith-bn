"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _wishlistController = _interopRequireDefault(require("../controllers/wishlistController"));
var _verifyIsBuyer = _interopRequireDefault(require("../middlewares/verifyIsBuyer"));
// CREATE ROUTER
var router = _express["default"].Router();

// ADD PRODUCT TO WISHLIST
router.post('/:id', _verifyIsBuyer["default"], _wishlistController["default"].addTowishlist);
router.get('/', _verifyIsBuyer["default"], _wishlistController["default"].getWishlist);
router["delete"]('/', _verifyIsBuyer["default"], _wishlistController["default"].deleteWishlist);
router["delete"]('/:id', _verifyIsBuyer["default"], _wishlistController["default"].deleteSingleProduct);
var _default = router;
exports["default"] = _default;