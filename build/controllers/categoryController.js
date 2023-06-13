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
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _pagination = require("../utils/pagination.js");
// LOAD MODELS FROM DB
var product = _index["default"].product,
  category = _index["default"].category;

// CONFIGURE DOTENV
_dotenv["default"].config();
var CategoryController = /*#__PURE__*/function () {
  function CategoryController() {
    (0, _classCallCheck2["default"])(this, CategoryController);
  }
  (0, _createClass2["default"])(CategoryController, null, [{
    key: "fetchAllCategories",
    value: // FETCH ALL CATEGORIES
    function () {
      var _fetchAllCategories = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var categories;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return category.findAll({});
            case 3:
              categories = _context.sent;
              return _context.abrupt("return", res.status(200).json({
                status: 'success',
                data: categories
              }));
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                message: _context.t0.message
              }));
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      function fetchAllCategories(_x, _x2) {
        return _fetchAllCategories.apply(this, arguments);
      }
      return fetchAllCategories;
    }() // GET ALL PRODUCTS IN A CATEGORY
  }, {
    key: "getCategoryById",
    value: function () {
      var _getCategoryById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$query, page, size, _getPagination, limit, id, products;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _req$query = req.query, page = _req$query.page, size = _req$query.size;
              _getPagination = (0, _pagination.getPagination)(page, size), limit = _getPagination.limit;
              id = req.params.id;
              _context2.prev = 3;
              _context2.next = 6;
              return product.findAndCountAll({
                where: {
                  categoryId: id
                },
                limit: limit,
                include: [{
                  model: category,
                  as: 'categories',
                  attributes: ['name']
                }]
              });
            case 6:
              products = _context2.sent;
              if (products) {
                _context2.next = 9;
                break;
              }
              return _context2.abrupt("return", res.status(404).json({
                message: 'Category not found'
              }));
            case 9:
              return _context2.abrupt("return", res.status(200).json({
                message: 'Category retrieved successfully',
                data: (0, _pagination.getPagingData)(products, page, limit)
              }));
            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](3);
              return _context2.abrupt("return", res.status(500).json({
                message: _context2.t0.message
              }));
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 12]]);
      }));
      function getCategoryById(_x3, _x4) {
        return _getCategoryById.apply(this, arguments);
      }
      return getCategoryById;
    }()
  }]);
  return CategoryController;
}();
var _default = CategoryController;
exports["default"] = _default;