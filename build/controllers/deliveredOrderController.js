"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _models = _interopRequireDefault(require("../../database/models"));
var _server = require("../server");
var Order = _models["default"].order,
  User = _models["default"].user,
  product = _models["default"].product;
var logger = require('./logger');
var delivery = /*#__PURE__*/function () {
  function delivery() {
    (0, _classCallCheck2["default"])(this, delivery);
  }
  (0, _createClass2["default"])(delivery, null, [{
    key: "deliverOrder",
    value: function () {
      var _deliverOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, res) {
        var params, id, order, deliveredOrder;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              params = _ref.params;
              _context.prev = 1;
              id = params.id;
              _context.next = 5;
              return Order.findOne({
                where: {
                  id: id
                },
                include: {
                  model: product,
                  as: 'product',
                  attributes: ['userId']
                }
              });
            case 5:
              order = _context.sent;
              if (order) {
                _context.next = 9;
                break;
              }
              logger.orderLogger.error('/PUT statusCode: 404 : Order to be delivered does not exist');
              return _context.abrupt("return", res.status(404).json({
                message: 'Order does not exist'
              }));
            case 9:
              if (!(order.product.dataValues.userId !== res.locals.id)) {
                _context.next = 12;
                break;
              }
              logger.orderLogger.error('/PUT statusCode: 401 : Unauthorised user tries to mark order as delivered');
              return _context.abrupt("return", res.status(401).json({
                order: order,
                message: 'The products in this order does not belong to you!'
              }));
            case 12:
              if (!(order.status !== 'onWay' || order.status !== 'delivered')) {
                _context.next = 15;
                break;
              }
              logger.orderLogger.error('/PUT statusCode: 401 : User tries to mark order as deliverd twice, or mark unpaid order as delivered');
              return _context.abrupt("return", res.status(401).json({
                message: 'Order is not yet paid or already delivered!'
              }));
            case 15:
              _context.next = 17;
              return Order.update({
                status: 'delivered'
              }, {
                where: {
                  id: params.id
                },
                returning: true,
                plain: true
              });
            case 17:
              deliveredOrder = _context.sent;
              // CHANGE THE SOCKET STATUS
              _server.io.emit('status_change', 'Delivered');
              logger.orderLogger.info('/PUT statusCode: 200 : User mark order as deliverd successfully');
              return _context.abrupt("return", res.status(200).json({
                message: 'Order is successfully flagged as delivered and email was sent to the Buyer',
                order: deliveredOrder.dataValues
              }));
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](1);
              logger.orderLogger.error("/PUT statusCode: 500 : Marking order as delivered failed ".concat(_context.t0.message));
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0.message
              }));
            case 27:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 23]]);
      }));
      function deliverOrder(_x, _x2) {
        return _deliverOrder.apply(this, arguments);
      }
      return deliverOrder;
    }() // CANCELLING DELIVERY
  }, {
    key: "cancelDelivery",
    value: function () {
      var _cancelDelivery = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2, res) {
        var params, id, order, deliveredOrder;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              params = _ref2.params;
              _context2.prev = 1;
              id = params.id;
              _context2.next = 5;
              return Order.findOne({
                where: {
                  id: id
                },
                include: {
                  model: product,
                  as: 'product',
                  attributes: ['userId'],
                  include: {
                    model: User,
                    as: 'user',
                    attributes: ['name', 'email']
                  }
                }
              });
            case 5:
              order = _context2.sent;
              if (order) {
                _context2.next = 9;
                break;
              }
              logger.orderLogger.error('/PUT statusCode: 404 : Order to be cancelled does not exist');
              return _context2.abrupt("return", res.status(404).json({
                message: 'order does not exist'
              }));
            case 9:
              if (!(order.userId !== res.locals.id)) {
                _context2.next = 12;
                break;
              }
              logger.orderLogger.warn("/PUT statusCode: 401 : User tries to cancel someone's order");
              return _context2.abrupt("return", res.status(401).json({
                message: 'You can only cancely your own orders'
              }));
            case 12:
              _context2.next = 14;
              return Order.update({
                status: 'paid'
              }, {
                where: {
                  id: params.id
                },
                returning: true,
                plain: true
              });
            case 14:
              deliveredOrder = _context2.sent;
              if (deliveredOrder) {
                _context2.next = 18;
                break;
              }
              logger.orderLogger.warn('/PUT statusCode: 400 : Order not cancelled, reload required ');
              return _context2.abrupt("return", res.status(400).json({
                error: 'Status not updated. Please reload and try again!'
              }));
            case 18:
              // CHANGE THE SOCKET STATUS
              _server.io.emit('status_change', 'Cancelled');
              logger.orderLogger.info('/PUT statusCode: 200 : User cancelled order succesfully');
              return _context2.abrupt("return", res.status(200).json({
                message: 'Order is successfully marked as cancelled. check your email for confirmation',
                order: deliveredOrder.dataValues
              }));
            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](1);
              logger.orderLogger.error("/PUT statusCode: 500 : Cancelling order failed ".concat(_context2.t0.message));
              return _context2.abrupt("return", res.status(500).json({
                error: _context2.t0.message
              }));
            case 27:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 23]]);
      }));
      function cancelDelivery(_x3, _x4) {
        return _cancelDelivery.apply(this, arguments);
      }
      return cancelDelivery;
    }() // DELIVERY ON THE WAY
  }, {
    key: "deliveryMoving",
    value: function () {
      var _deliveryMoving = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3, res) {
        var params, id, order, _deliveryMoving2;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              params = _ref3.params;
              _context3.prev = 1;
              id = params.id;
              _context3.next = 5;
              return Order.findOne({
                where: {
                  id: id
                },
                include: {
                  model: product,
                  as: 'product',
                  attributes: ['userId']
                }
              });
            case 5:
              order = _context3.sent;
              if (order) {
                _context3.next = 9;
                break;
              }
              logger.orderLogger.error('/PUT statusCode: 404 : Order to be marked as onWay does not exist');
              return _context3.abrupt("return", res.status(404).json({
                message: 'Order does not exist'
              }));
            case 9:
              if (!(order.product.dataValues.userId !== res.locals.id)) {
                _context3.next = 12;
                break;
              }
              logger.orderLogger.warn('/PUT statusCode: 401 : Unauthorised user tries to mark order as onWay');
              return _context3.abrupt("return", res.status(401).json({
                order: order,
                message: 'The products in this order does not belong to you!'
              }));
            case 12:
              _context3.next = 14;
              return order.update({
                status: 'onWay'
              }, {
                where: {
                  where: {
                    id: params.id
                  },
                  returning: true,
                  plain: true
                }
              });
            case 14:
              _deliveryMoving2 = _context3.sent;
              if (_deliveryMoving2) {
                _context3.next = 18;
                break;
              }
              logger.orderLogger.error('/PUT statusCode: 400 : Order not updated, reload required ');
              return _context3.abrupt("return", res.status(400).json({
                message: 'Status not updated. Please reload and try again!'
              }));
            case 18:
              // CHANGE THE SOCKET STATUS
              _server.io.emit('status_change', 'On Way');
              logger.orderLogger.warn('/PUT statusCode: 200 :Order marked as onWay succesfully ');
              return _context3.abrupt("return", res.status(200).json({
                message: 'Delivery successfully marked as on way',
                order: _deliveryMoving2.dataValues
              }));
            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3["catch"](1);
              logger.orderLogger.error("/PUT statusCode: 500 : Updating order ".concat(_context3.t0.message));
              return _context3.abrupt("return", res.status(500).json({
                error: _context3.t0.message
              }));
            case 27:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 23]]);
      }));
      function deliveryMoving(_x5, _x6) {
        return _deliveryMoving.apply(this, arguments);
      }
      return deliveryMoving;
    }()
  }]);
  return delivery;
}();
var _default = delivery;
exports["default"] = _default;