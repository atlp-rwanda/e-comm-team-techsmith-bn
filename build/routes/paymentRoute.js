"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _paymentsController = _interopRequireDefault(require("../controllers/paymentsController"));
var _verifyIsBuyer = _interopRequireDefault(require("../middlewares/verifyIsBuyer"));
// CREATE ROUTER
var router = _express["default"].Router();

// GET ALL PAYMENTS
router.get('/', _verifyIsBuyer["default"], _paymentsController["default"].getPayments);

// DELETE PAYMENT
router["delete"]('/:orderId', _verifyIsBuyer["default"], _paymentsController["default"].deletePayment);

// EXPORT ROUTER
var _default = router;
exports["default"] = _default;