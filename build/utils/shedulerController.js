"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _productController = _interopRequireDefault(require("../controllers/productController.js"));
var _backingUp = _interopRequireDefault(require("./backingUp.js"));
// send email every 2 weeks
_nodeCron["default"].schedule(' 0 0 24 * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        _context.next = 2;
        return _productController["default"].expirationOfProducts();
      case 2:
      case "end":
        return _context.stop();
    }
  }, _callee);
})));

// Database back up every day midnight
_nodeCron["default"].schedule('0 0 0 * * *', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        (0, _backingUp["default"])();
      case 1:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
})));