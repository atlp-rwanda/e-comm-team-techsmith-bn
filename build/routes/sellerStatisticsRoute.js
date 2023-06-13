"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _verifyIsSeller = _interopRequireDefault(require("../middlewares/verifyIsSeller"));
var _sellerStatistics = _interopRequireDefault(require("../controllers/sellerStatistics.js"));
var router = _express["default"].Router();
router.post('/seller', _verifyIsSeller["default"], _sellerStatistics["default"].productStatus);
var _default = router;
exports["default"] = _default;