"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _pagination = require("../utils/pagination.js");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var review = _index["default"].review,
  order = _index["default"].order,
  product = _index["default"].product,
  payment = _index["default"].payment,
  user = _index["default"].user;
var logger = require('./logger');
var feedbackController = /*#__PURE__*/function () {
  function feedbackController() {
    (0, _classCallCheck2["default"])(this, feedbackController);
  }
  (0, _createClass2["default"])(feedbackController, null, [{
    key: "createFeedback",
    value: //   CREATING FEEDBACK
    function () {
      var _createFeedback = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, rating, feedback, productId, id, orderPlacement, orderId, paymentConfirmation, saveReview;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, rating = _req$body.rating, feedback = _req$body.feedback;
              productId = req.params.pId;
              _context.prev = 2;
              // GETTING LOGGED IN USER CREDENTIALS
              id = res.locals.id; // CHECKING IF THE USER HAS MADE AN ORDER
              _context.next = 6;
              return order.findOne({
                where: {
                  productId: productId
                }
              });
            case 6:
              orderPlacement = _context.sent;
              if (orderPlacement) {
                _context.next = 10;
                break;
              }
              logger.feedbackLogger.error('/POST statusCode: 404 : No feedback made, user need to make order');
              return _context.abrupt("return", res.status(404).json({
                message: 'First make a order!'
              }));
            case 10:
              orderId = orderPlacement.id; // CHECKING IF THE USER HAS MADE A PAYMENT
              _context.next = 13;
              return payment.findOne({
                where: (0, _defineProperty2["default"])({}, Op.and, [{
                  userId: id
                }, {
                  orderId: orderId
                }]),
                include: [{
                  model: order,
                  as: 'order',
                  attributes: ['id']
                }]
              });
            case 13:
              paymentConfirmation = _context.sent;
              if (paymentConfirmation) {
                _context.next = 17;
                break;
              }
              logger.feedbackLogger.error('/POST statusCode: 404 : No feedback made, user need to make payment');
              return _context.abrupt("return", res.status(404).json({
                message: 'First complete payment process!'
              }));
            case 17:
              _context.next = 19;
              return review.create({
                userId: id,
                productId: productId,
                rating: rating,
                feedback: feedback
              });
            case 19:
              saveReview = _context.sent;
              logger.feedbackLogger.info('/POST statusCode: 201 :  feedback received successfully');
              return _context.abrupt("return", res.status(201).json({
                ok: true,
                message: 'Thanks for your feedback!',
                data: saveReview
              }));
            case 24:
              _context.prev = 24;
              _context.t0 = _context["catch"](2);
              logger.feedbackLogger.error("/POST statusCode: 500 : No feedback made: ".concat(_context.t0.message, " "));
              return _context.abrupt("return", res.status(500).json({
                message: _context.t0.message
              }));
            case 28:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 24]]);
      }));
      function createFeedback(_x, _x2) {
        return _createFeedback.apply(this, arguments);
      }
      return createFeedback;
    }() // GETTING FEEDBACK ON A PRODUCT
  }, {
    key: "allFeedback",
    value: function () {
      var _allFeedback = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var pId, _req$query, size, page, _getPagination, limit, checkProduct, paymentConfirmation, orders;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              pId = req.params.pId;
              _req$query = req.query, size = _req$query.size, page = _req$query.page;
              _getPagination = (0, _pagination.getPagination)(page, size || 10), limit = _getPagination.limit;
              _context2.prev = 3;
              _context2.next = 6;
              return product.findOne({
                where: {
                  id: pId
                }
              });
            case 6:
              checkProduct = _context2.sent;
              if (checkProduct) {
                _context2.next = 10;
                break;
              }
              logger.productLogger.error('/GET statusCode: 404 : Item not found ');
              return _context2.abrupt("return", res.status(404).json({
                message: 'Product does not exists!'
              }));
            case 10:
              _context2.next = 12;
              return order.findOne({
                where: {
                  productId: pId
                }
              });
            case 12:
              paymentConfirmation = _context2.sent;
              if (paymentConfirmation) {
                _context2.next = 16;
                break;
              }
              logger.feedbackLogger.error('/GET statusCode: 404 : No feedback found, product never been purchased');
              return _context2.abrupt("return", res.status(404).json({
                message: 'The product has never been purchased'
              }));
            case 16:
              _context2.next = 18;
              return review.findAndCountAll({
                where: {
                  productId: pId
                },
                limit: limit,
                attributes: {
                  exclude: ['userId', 'productId', 'CreatedAt', 'UpdatedAt']
                },
                include: [{
                  model: user,
                  as: 'user',
                  attributes: ['name']
                }, {
                  model: product,
                  as: 'product',
                  attributes: ['name']
                }]
              });
            case 18:
              orders = _context2.sent;
              if (!(orders.length <= 0)) {
                _context2.next = 22;
                break;
              }
              logger.feedbackLogger.info('/GET statusCode: 200 : No feedback from customer found');
              return _context2.abrupt("return", res.status(200).json({
                ok: true,
                message: 'We have no feedback from our customer yet!'
              }));
            case 22:
              logger.feedbackLogger.info('/GET statusCode: 200 : Feedback fetched sucessfully');
              return _context2.abrupt("return", res.status(200).json({
                ok: true,
                data: (0, _pagination.getPagingData)(orders, page, limit)
              }));
            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](3);
              logger.productLogger.error(" / GET statusCode: 500: Fetching feedbacks failed: ".concat(_context2.t0.message));
              return _context2.abrupt("return", res.status(500).json({
                message: _context2.t0.message
              }));
            case 30:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 26]]);
      }));
      function allFeedback(_x3, _x4) {
        return _allFeedback.apply(this, arguments);
      }
      return allFeedback;
    }()
  }]);
  return feedbackController;
}();
var _default = feedbackController;
exports["default"] = _default;