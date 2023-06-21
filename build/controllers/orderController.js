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
var _validateQuantity = _interopRequireDefault(require("../utils/validateQuantity.js"));
var order = _index["default"].order,
  product = _index["default"].product,
  user = _index["default"].user;
var Sequelize = require('sequelize');
var logger = require('./logger');
var Op = Sequelize.Op;
var OrderController = /*#__PURE__*/function () {
  function OrderController() {
    (0, _classCallCheck2["default"])(this, OrderController);
  }
  (0, _createClass2["default"])(OrderController, null, [{
    key: "getOrders",
    value: // get allorders
    function () {
      var _getOrders = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var pageAsNumber, sizeAsNumber, page, size, offset, orders, totalPages, currentPage, prevPage, nextPage;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
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
              _context.prev = 7;
              _context.next = 10;
              return order.findAndCountAll({
                include: [{
                  model: user,
                  as: 'user',
                  attributes: ['name']
                }, {
                  model: product,
                  as: 'product',
                  attributes: ['name']
                }],
                limit: size,
                offset: offset
              });
            case 10:
              orders = _context.sent;
              if (!(orders.rows.length === 0)) {
                _context.next = 14;
                break;
              }
              logger.orderLogger.error('/GET statusCode: 404 : No order found on page');
              return _context.abrupt("return", res.status(404).json({
                message: "There is no orders found on page ".concat(page)
              }));
            case 14:
              totalPages = Math.ceil(orders.count / size);
              currentPage = page > totalPages ? totalPages : page;
              prevPage = currentPage === 1 ? null : currentPage - 1;
              nextPage = currentPage === totalPages ? null : currentPage + 1;
              logger.orderLogger.info('/GET statusCode: 200 : Orders fetched successfully');
              res.status(200).json({
                ok: true,
                message: "List of all ".concat(orders.count, " orders"),
                data: {
                  totalItems: orders.count,
                  totalPages: totalPages,
                  pageSize: size,
                  currentPage: currentPage,
                  prevPage: prevPage,
                  nextPage: nextPage,
                  orders: orders.rows
                }
              });
              _context.next = 26;
              break;
            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](7);
              logger.orderLogger.error("/GET statusCode: 500 : Fetching product in collection failed : ".concat(_context.t0.message));
              return _context.abrupt("return", res.status(500).json(_context.t0.message));
            case 26:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[7, 22]]);
      }));
      function getOrders(_x, _x2) {
        return _getOrders.apply(this, arguments);
      }
      return getOrders;
    }() // Create order
  }, {
    key: "createOrder",
    value: function () {
      var _createOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body, productId, desiredQuantity, amount, checkProduct, validateQty, newOrder;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, productId = _req$body.productId, desiredQuantity = _req$body.desiredQuantity, amount = _req$body.amount;
              _context2.prev = 1;
              _context2.next = 4;
              return product.findOne({
                where: {
                  id: productId,
                  isAvailable: true
                }
              });
            case 4:
              checkProduct = _context2.sent;
              if (checkProduct) {
                _context2.next = 8;
                break;
              }
              logger.productLogger.error('/POST statusCode: 404 : Product not found');
              return _context2.abrupt("return", res.status(404).json({
                ok: false,
                message: 'Product not found!'
              }));
            case 8:
              _context2.next = 10;
              return (0, _validateQuantity["default"])(product, productId, desiredQuantity, res);
            case 10:
              validateQty = _context2.sent;
              if (validateQty) {
                _context2.next = 14;
                break;
              }
              logger.orderLogger.error('/POST statusCode: 400 : User require more quantity than in Qty in the stock');
              return _context2.abrupt("return", res.status(400).json({
                message: "the remaining quantity in stock is low"
              }));
            case 14:
              _context2.next = 16;
              return order.create({
                productId: productId,
                userId: res.locals.id,
                status: 'Pending',
                quantity: desiredQuantity,
                amount: amount
              });
            case 16:
              newOrder = _context2.sent;
              _context2.next = 19;
              return product.update({
                quantity: validateQty - desiredQuantity
              }, {
                where: {
                  id: productId
                }
              });
            case 19:
              logger.orderLogger.info('/POST statusCode: 404 : Product not found');
              return _context2.abrupt("return", res.status(201).json({
                ok: true,
                message: 'Order created successfully',
                data: newOrder
              }));
            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](1);
              logger.orderLogger.info("/POST statusCode: 500 : Making order failed: ".concat(_context2.t0.message));
              return _context2.abrupt("return", res.status(500).json({
                ok: false,
                message: _context2.t0.message
              }));
            case 27:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 23]]);
      }));
      function createOrder(_x3, _x4) {
        return _createOrder.apply(this, arguments);
      }
      return createOrder;
    }()
  }, {
    key: "updateOrder",
    value: function () {
      var _updateOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var desiredQuantity, oId, userId, orderExists, previousQty, productId, validateQty, _updateOrder2, updateQty, _updateQty;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              desiredQuantity = req.body.quantity;
              oId = req.params.oId; // Getting logged in user's id
              userId = res.locals.id;
              _context3.prev = 3;
              _context3.next = 6;
              return order.findOne({
                where: (0, _defineProperty2["default"])({}, Op.and, [{
                  id: oId
                }, {
                  userId: userId
                }, {
                  status: (0, _defineProperty2["default"])({}, Op.ne, 'pending')
                }]),
                include: [{
                  model: product,
                  as: 'product',
                  attributes: ['id']
                }]
              });
            case 6:
              orderExists = _context3.sent;
              previousQty = orderExists.quantity;
              productId = orderExists.productId; // If the order doesn't exists
              if (orderExists) {
                _context3.next = 12;
                break;
              }
              logger.orderLogger.error("/PUT statusCode: 404 : order not found ");
              return _context3.abrupt("return", res.status(404).json({
                message: "Order doesn't exists!"
              }));
            case 12:
              _context3.next = 14;
              return (0, _validateQuantity["default"])(product, orderExists.product.dataValues.id, desiredQuantity, res);
            case 14:
              validateQty = _context3.sent;
              if (validateQty) {
                _context3.next = 18;
                break;
              }
              logger.orderLogger.error("/PUT statusCode: 400 : User require more Qty than in stock ");
              return _context3.abrupt("return", res.status(400).json({
                message: "the remaining quantity in stock is low"
              }));
            case 18:
              _context3.next = 20;
              return order.update({
                quantity: desiredQuantity
              }, {
                where: {
                  id: oId
                },
                returning: true
              });
            case 20:
              _updateOrder2 = _context3.sent;
              if (!(desiredQuantity > previousQty)) {
                _context3.next = 27;
                break;
              }
              updateQty = desiredQuantity - previousQty;
              _context3.next = 25;
              return product.update({
                quantity: validateQty - updateQty
              }, {
                where: {
                  id: productId
                }
              });
            case 25:
              _context3.next = 30;
              break;
            case 27:
              _updateQty = previousQty - desiredQuantity;
              _context3.next = 30;
              return product.update({
                quantity: validateQty + _updateQty
              }, {
                where: {
                  id: productId
                }
              });
            case 30:
              if (!_updateOrder2) {
                _context3.next = 33;
                break;
              }
              logger.orderLogger.info("/PUT statusCode: 404 : Order successfully updated ");
              return _context3.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Order successfully updated!'
              }));
            case 33:
              _context3.next = 39;
              break;
            case 35:
              _context3.prev = 35;
              _context3.t0 = _context3["catch"](3);
              logger.orderLogger.error("/PUT statusCode: 500 : Placing order failed : ".concat(_context3.t0.message, " "));
              return _context3.abrupt("return", res.status(500).json({
                ok: false,
                message: _context3.t0.message
              }));
            case 39:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[3, 35]]);
      }));
      function updateOrder(_x5, _x6) {
        return _updateOrder.apply(this, arguments);
      }
      return updateOrder;
    }()
  }, {
    key: "deleteOrder",
    value: function () {
      var _deleteOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var oId, userId, orderExists, _deleteOrder2;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              oId = req.params.oId;
              _context4.prev = 1;
              // Getting logged in user's id
              userId = res.locals.id; // Checking if the order exists
              _context4.next = 5;
              return order.findOne({
                where: (0, _defineProperty2["default"])({}, Op.and, [{
                  id: oId
                }, {
                  userId: userId
                }])
              });
            case 5:
              orderExists = _context4.sent;
              if (orderExists) {
                _context4.next = 9;
                break;
              }
              logger.orderLogger.error('/DELETE statusCode: 404 :Order not found ');
              return _context4.abrupt("return", res.status(404).json({
                message: "Order doesn't exists!"
              }));
            case 9:
              _context4.next = 11;
              return order.destroy({
                where: {
                  id: oId
                }
              });
            case 11:
              _deleteOrder2 = _context4.sent;
              if (!_deleteOrder2) {
                _context4.next = 15;
                break;
              }
              logger.orderLogger.error('/DELETE statusCode: 200 :Order successful deleted ');
              return _context4.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Order successfully deleted'
              }));
            case 15:
              logger.orderLogger.error('/DELETE statusCode: 400 :Order not deleted ');
              return _context4.abrupt("return", res.status(400).json({
                ok: false,
                message: 'Not deleted!'
              }));
            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](1);
              logger.orderLogger.error("/DELETE statusCode: 400 :Deleting order failed :".concat(_context4.t0.message));
              return _context4.abrupt("return", res.status(500).json({
                ok: false,
                message: _context4.t0.message
              }));
            case 23:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 19]]);
      }));
      function deleteOrder(_x7, _x8) {
        return _deleteOrder.apply(this, arguments);
      }
      return deleteOrder;
    }() // SINGLE ORDER
  }, {
    key: "singleOrder",
    value: function () {
      var _singleOrder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var orderId, _singleOrder2;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              orderId = req.params.orderId; // THEN FIND THE USER WHOSE ID IS ORDERiD
              _context5.next = 4;
              return order.findOne({
                where: {
                  userId: res.locals.id,
                  id: orderId
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
            case 4:
              _singleOrder2 = _context5.sent;
              if (_singleOrder2) {
                _context5.next = 8;
                break;
              }
              logger.orderLogger.error('/GET statusCode: 404 :Order not found ');
              return _context5.abrupt("return", res.status(404).json({
                message: 'Order does not exist! Please contact the us for further inquiries'
              }));
            case 8:
              logger.orderLogger.info('/GET statusCode: 404 :Specific order found ');
              return _context5.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Order found',
                data: _singleOrder2
              }));
            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              logger.orderLogger.error('/GET statusCode: 500 : Getting single order failed');
              return _context5.abrupt("return", res.status(500).json({
                ok: false,
                error: _context5.t0.message
              }));
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 12]]);
      }));
      function singleOrder(_x9, _x10) {
        return _singleOrder.apply(this, arguments);
      }
      return singleOrder;
    }()
  }]);
  return OrderController;
}();
var _default = OrderController;
exports["default"] = _default;