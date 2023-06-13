"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _cookies = require("../utils/cookies.js");
// CONFIGURE DOTENV
_dotenv["default"].config();
var user = _index["default"].user,
  order = _index["default"].order,
  payment = _index["default"].payment,
  product = _index["default"].product;
var secret = process.env.USER_SECRET;
var logger = require('../controllers/logger');
var validatePayment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var orderId, cookie, token, _jwt$verify, role, userId, findOrder, findUser, orderPaid, findProduct;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          orderId = req.params.id;
          _context.prev = 1;
          // GET COOKIE FROM REQUEST
          cookie = (0, _cookies.getCookie)(req); // CHECK IF COOKIE IS PRESENT
          token = (0, _cookies.getToken)(req);
          if (cookie) {
            _context.next = 7;
            break;
          }
          logger.paymentLogger.error('/POST statusCode: 401 : Login required to make payment');
          return _context.abrupt("return", res.status(401).json({
            message: 'You are not authorized to make a payment'
          }));
        case 7:
          _jwt$verify = _jsonwebtoken["default"].verify(token, secret), role = _jwt$verify.role, userId = _jwt$verify.id;
          if (!(Number(role) !== 3)) {
            _context.next = 11;
            break;
          }
          logger.userLogger.error('/POST statusCode: 403 : Unauthorized user makes payment');
          return _context.abrupt("return", res.status(403).json({
            message: 'You are not authorized to make this payment. Only buyers can make payments'
          }));
        case 11:
          _context.next = 13;
          return order.findOne({
            where: {
              id: orderId
            }
          });
        case 13:
          findOrder = _context.sent;
          if (findOrder) {
            _context.next = 17;
            break;
          }
          logger.paymentLogger.error('/POST statusCode: 404 : Order to be paid not found');
          return _context.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));
        case 17:
          _context.next = 19;
          return user.findOne({
            where: {
              id: userId
            }
          });
        case 19:
          findUser = _context.sent;
          if (!(findOrder.userId !== userId)) {
            _context.next = 23;
            break;
          }
          logger.paymentLogger.error('/POST statusCode: 403 : User tries to pay unauthorised order');
          return _context.abrupt("return", res.status(403).json({
            message: 'You are not authorized to make this payment. This order does not belong to you'
          }));
        case 23:
          _context.next = 25;
          return payment.findOne({
            where: {
              orderId: orderId
            }
          });
        case 25:
          orderPaid = _context.sent;
          if (!orderPaid) {
            _context.next = 29;
            break;
          }
          logger.userLogger.error('/POST statusCode: 409 : User tries pay order twice');
          return _context.abrupt("return", res.status(409).json({
            message: 'You have already paid for this order'
          }));
        case 29:
          _context.next = 31;
          return product.findOne({
            where: {
              id: findOrder.productId
            }
          });
        case 31:
          findProduct = _context.sent;
          if (findProduct) {
            _context.next = 35;
            break;
          }
          logger.paymentLogger.error('/POST statusCode: 404 : Product to pay not found!');
          return _context.abrupt("return", res.status(404).json({
            message: 'Product not found'
          }));
        case 35:
          // PASS THE VALUES TO THE CONTROLLER
          res.locals = {
            findUser: findUser,
            findOrder: findOrder,
            orderPaid: orderPaid,
            findProduct: findProduct
          };
          next();
          _context.next = 43;
          break;
        case 39:
          _context.prev = 39;
          _context.t0 = _context["catch"](1);
          logger.paymentLogger.error("/POST statusCode: 500 : Payment failed : ".concat(_context.t0.message));
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));
        case 43:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 39]]);
  }));
  return function validatePayment(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = validatePayment;
exports["default"] = _default;