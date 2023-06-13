"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _moment = _interopRequireDefault(require("moment"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index2 = _interopRequireDefault(require("../../database/models/index.js"));
_dotenv["default"].config();
var order = _index2["default"].order,
  product = _index2["default"].product;
var sellerStatisticsController = /*#__PURE__*/function () {
  function sellerStatisticsController() {
    (0, _classCallCheck2["default"])(this, sellerStatisticsController);
  }
  (0, _createClass2["default"])(sellerStatisticsController, null, [{
    key: "productStatus",
    value: function () {
      var _productStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var feeCharged, sellerId, _req$body, start, end, filteredProduct, results, index, result, numOrders, paidProduct, _index, totalRevenue, productSold, moneyMade, topSellingProduct;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              feeCharged = 0.1; // const available
              _context.prev = 1;
              sellerId = res.locals.id;
              _req$body = req.body, start = _req$body.start, end = _req$body.end;
              if (!end) end = new Date();else {
                end = (0, _moment["default"])();
              }
              if (!start) start = (0, _moment["default"])().subtract(1, 'month');else {
                start = new Date(start);
              }
              _context.next = 8;
              return product.findAll({
                where: {
                  userId: sellerId,
                  createdAt: (0, _defineProperty2["default"])({}, _index2["default"].Sequelize.Op.between, [start, end])
                }
              });
            case 8:
              filteredProduct = _context.sent;
              results = [];
              /* eslint-disable  */
              index = 0;
            case 11:
              if (!(index < filteredProduct.length)) {
                _context.next = 19;
                break;
              }
              _context.next = 14;
              return order.findOne({
                where: {
                  productId: filteredProduct[index].dataValues.id
                },
                include: {
                  model: product,
                  as: "product",
                  attributes: ['name']
                }
              });
            case 14:
              result = _context.sent;
              if (result !== null) {
                results.push(result);
              }
            case 16:
              index++;
              _context.next = 11;
              break;
            case 19:
              numOrders = results.length;
              paidProduct = [];
              for (_index = 0; _index < results.length; _index++) {
                if (results[_index].dataValues.status === "Paid") {
                  paidProduct.push(results[_index]);
                }
              }
              // Calculate the metrics
              _context.next = 24;
              return paidProduct.reduce(function (total, orders) {
                return total + orders.amount;
              }, 0);
            case 24:
              totalRevenue = _context.sent;
              _context.next = 27;
              return paidProduct.reduce(function (total) {
                return total + 1;
              }, 0);
            case 27:
              productSold = _context.sent;
              _context.next = 30;
              return totalRevenue;
            case 30:
              _context.t0 = _context.sent;
              _context.t1 = totalRevenue * feeCharged;
              moneyMade = _context.t0 - _context.t1;
              topSellingProduct = paidProduct.reduce(function (products, orders) {
                var newProduct = {
                  id: orders.productId,
                  name: "".concat(orders.product.dataValues.name),
                  productQuantity: orders.quantity
                };
                return [].concat((0, _toConsumableArray2["default"])(products), [newProduct]);
              }, []).sort(function (a, b) {
                return b.productQuantity - a.productQuantity;
              }).slice(0, 3);
              _context.next = 36;
              return res.status(200).json({
                numOrders: numOrders,
                totalRevenue: totalRevenue,
                productSold: productSold,
                moneyMade: moneyMade,
                topSellingProduct: topSellingProduct
              });
            case 36:
              return _context.abrupt("return", _context.sent);
            case 39:
              _context.prev = 39;
              _context.t2 = _context["catch"](1);
              console.log(_context.t2);
              return _context.abrupt("return", res.status(500).json({
                message: _context.t2.message
              }));
            case 43:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 39]]);
      }));
      function productStatus(_x, _x2) {
        return _productStatus.apply(this, arguments);
      }
      return productStatus;
    }()
  }]);
  return sellerStatisticsController;
}();
var _default = sellerStatisticsController;
exports["default"] = _default;