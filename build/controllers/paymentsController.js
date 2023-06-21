"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _stripe = _interopRequireDefault(require("stripe"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _emails = require("../utils/emails.js");
var _excluded = ["userId", "orderId"];
// LOAD MODELS FROM DB
var payment = _index["default"].payment,
  order = _index["default"].order;

// CONFIGURE DOTENV
_dotenv["default"].config();

// LOAD SECRET
var STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
var logger = require('./logger');
// CONFIGURE STRIPE
var stripePayment = (0, _stripe["default"])(STRIPE_SECRET_KEY);
var PaymentsController = /*#__PURE__*/function () {
  function PaymentsController() {
    (0, _classCallCheck2["default"])(this, PaymentsController);
  }
  (0, _createClass2["default"])(PaymentsController, null, [{
    key: "createPayment",
    value: // CREATE PAYMENT
    function () {
      var _createPayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _res$locals, findUser, findOrder, findProduct, card, stripeToken, stripeCustomer, stripeCharge, _createPayment2, _createPayment2$dataV, userId, orderId, rest, updateOrder, status, name, email;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // RETRIEVE VALUES RETURNED BY THE MIDDLEWARE
              _res$locals = res.locals, findUser = _res$locals.findUser, findOrder = _res$locals.findOrder, findProduct = _res$locals.findProduct;
              card = req.body.card; // eslint-disable-next-line no-console
              console.log(card);
              _context.prev = 3;
              _context.next = 6;
              return stripePayment.tokens.create({
                card: card
              });
            case 6:
              stripeToken = _context.sent;
              _context.next = 9;
              return stripePayment.customers.create({
                email: findUser.email,
                source: stripeToken.id,
                address: {
                  line1: findUser.physicalAddress
                },
                name: findUser.name,
                description: "Customer for ".concat(findUser.email)
              });
            case 9:
              stripeCustomer = _context.sent;
              _context.next = 12;
              return stripePayment.charges.create({
                amount: findOrder.amount,
                currency: 'usd',
                customer: stripeCustomer.id,
                description: "Charge for ".concat(findProduct.name)
              });
            case 12:
              stripeCharge = _context.sent;
              if (!stripeCharge) {
                _context.next = 25;
                break;
              }
              _context.next = 16;
              return payment.create({
                orderId: findOrder.id,
                userId: findUser.id,
                receiptUrl: stripeCharge.receipt_url,
                attributes: {
                  exclude: ['updatedAt', 'createdAt', 'userId']
                }
              });
            case 16:
              _createPayment2 = _context.sent;
              _createPayment2$dataV = _createPayment2.dataValues, userId = _createPayment2$dataV.userId, orderId = _createPayment2$dataV.orderId, rest = (0, _objectWithoutProperties2["default"])(_createPayment2$dataV, _excluded); // SEND EMAIL TO USER
              (0, _emails.nodeMail)(findUser.email, findUser.name, "Payment for ".concat(findProduct.name, " was successful"), _emails.paymentSuccessfulMessage, _createPayment2.receiptUrl);
              // UPDATE ORDER STATUS
              _context.next = 21;
              return findOrder.update({
                status: 'Paid'
              }, {
                returning: true
              });
            case 21:
              updateOrder = _context.sent;
              status = updateOrder.status;
              name = findUser.name, email = findUser.email;
              return _context.abrupt("return", res.status(201).json({
                ok: true,
                message: 'Payment successfully added and order status updated',
                data: rest,
                status: status,
                user: {
                  name: name,
                  email: email
                }
              }));
            case 25:
              _context.next = 31;
              break;
            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](3);
              logger.orderLogger.error('/POST statusCode: 500 :Payment failed');
              return _context.abrupt("return", res.status(500).json({
                message: _context.t0.message
              }));
            case 31:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[3, 27]]);
      }));
      function createPayment(_x, _x2) {
        return _createPayment.apply(this, arguments);
      }
      return createPayment;
    }() // GET PAYMENTS
  }, {
    key: "getPayments",
    value: function () {
      var _getPayments = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var pageAsNumber, sizeAsNumber, page, size, offset, id, _getPayments2, totalPages, currentPage, prevPage, nextPage;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              pageAsNumber = Number.parseInt(req.query.page, 10);
              sizeAsNumber = Number.parseInt(req.query.size, 10);
              page = 1;
              if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
                page = pageAsNumber;
              }
              size = 5;
              if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
              }
              offset = (page - 1) * size;
              _context2.prev = 7;
              // GET USER FROM LOCALS
              id = res.locals.id; // GET PAYMENTS
              _context2.next = 11;
              return payment.findAndCountAll({
                where: {
                  userId: id
                },
                include: [{
                  model: order,
                  as: 'order',
                  attributes: ['amount', 'status']
                }],
                limit: size,
                offset: offset
              });
            case 11:
              _getPayments2 = _context2.sent;
              totalPages = Math.ceil(_getPayments2.count / size);
              currentPage = page > totalPages ? totalPages : page;
              prevPage = currentPage === 1 ? null : currentPage - 1;
              nextPage = currentPage === totalPages ? null : currentPage + 1;
              if (!(_getPayments2.rows.length === 0)) {
                _context2.next = 18;
                break;
              }
              return _context2.abrupt("return", res.status(200).json({
                message: "There is no items found on page ".concat(page)
              }));
            case 18:
              return _context2.abrupt("return", res.status(200).json({
                ok: true,
                message: "All ".concat(_getPayments2.count, " Payments retrieved successfully"),
                data: {
                  totalItems: _getPayments2.count,
                  totalPages: totalPages,
                  pageSize: size,
                  currentPage: currentPage,
                  prevPage: prevPage,
                  nextPage: nextPage,
                  payments: _getPayments2.rows
                }
              }));
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](7);
              return _context2.abrupt("return", res.status(500).json({
                message: _context2.t0.message
              }));
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[7, 21]]);
      }));
      function getPayments(_x3, _x4) {
        return _getPayments.apply(this, arguments);
      }
      return getPayments;
    }() // DELETE PAYMENT USING ORDER ID
  }, {
    key: "deletePayment",
    value: function () {
      var _deletePayment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var orderId, id, findOrder, _deletePayment2;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              orderId = req.params.orderId;
              id = res.locals.id;
              _context3.prev = 2;
              _context3.next = 5;
              return order.findOne({
                where: {
                  id: orderId
                }
              });
            case 5:
              findOrder = _context3.sent;
              if (findOrder) {
                _context3.next = 8;
                break;
              }
              return _context3.abrupt("return", res.status(404).json({
                message: 'Order does not exist'
              }));
            case 8:
              if (!(findOrder.userId !== id)) {
                _context3.next = 10;
                break;
              }
              return _context3.abrupt("return", res.status(401).json({
                message: "You are not authorized to delete another user's order"
              }));
            case 10:
              _context3.next = 12;
              return payment.destroy({
                where: {
                  orderId: orderId
                }
              });
            case 12:
              _deletePayment2 = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                ok: true,
                data: _deletePayment2
              }));
            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](2);
              return _context3.abrupt("return", res.status(500).json({
                message: _context3.t0.message
              }));
            case 19:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[2, 16]]);
      }));
      function deletePayment(_x5, _x6) {
        return _deletePayment.apply(this, arguments);
      }
      return deletePayment;
    }()
  }]);
  return PaymentsController;
}();
var _default = PaymentsController;
exports["default"] = _default;