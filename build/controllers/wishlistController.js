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
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
// CONFIG DOTENV
_dotenv["default"].config();

// IMPORT MODEL PRODUCT
var product = _index["default"].product,
  wishlist = _index["default"].wishlist;

// IMPORT SEQUELIZE
var _require = require('sequelize'),
  Op = _require.Op;
var wishlistController = /*#__PURE__*/function () {
  function wishlistController() {
    (0, _classCallCheck2["default"])(this, wishlistController);
  }
  (0, _createClass2["default"])(wishlistController, null, [{
    key: "addTowishlist",
    value: // ADD TO WISHLIST
    function () {
      var _addTowishlist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var productId, userId, prod, wishlistProductExists;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              // USER
              // GET PRODUCT ID FROM PATH
              productId = req.params.id; // GET USER ID FROM LOCALS
              userId = res.locals.id; // CHECK IF PRODUCT IS NOT AVAILABLE
              _context.next = 5;
              return product.findOne({
                where: {
                  id: productId
                }
              });
            case 5:
              prod = _context.sent;
              if (prod) {
                _context.next = 8;
                break;
              }
              return _context.abrupt("return", res.status(404).json({
                message: 'Product not found'
              }));
            case 8:
              _context.next = 10;
              return wishlist.findOne({
                where: (0, _defineProperty2["default"])({}, Op.and, [{
                  productId: (0, _defineProperty2["default"])({}, Op.eq, productId)
                }, {
                  userId: (0, _defineProperty2["default"])({}, Op.eq, userId)
                }])
              });
            case 10:
              wishlistProductExists = _context.sent;
              if (!(!wishlistProductExists === false)) {
                _context.next = 13;
                break;
              }
              return _context.abrupt("return", res.status(409).json({
                message: 'Product already in wishlist'
              }));
            case 13:
              _context.next = 15;
              return wishlist.create({
                productId: productId,
                userId: userId
              });
            case 15:
              // RETURN RESPONSE
              res.status(201).json({
                message: 'Product added successfully'
              });
              // CATCH ERROR
              _context.next = 21;
              break;
            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                status: 'Adding product into wishlist failed',
                message: _context.t0.message
              }));
            case 21:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 18]]);
      }));
      function addTowishlist(_x, _x2) {
        return _addTowishlist.apply(this, arguments);
      }
      return addTowishlist;
    }() // GET WISHLIST
  }, {
    key: "getWishlist",
    value: function () {
      var _getWishlist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var pageAsNumber, sizeAsNumber, page, size, offset, userId, wishlistProd, totalPages, currentPage, prevPage, nextPage;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              pageAsNumber = Number.parseInt(req.query.page, 10);
              sizeAsNumber = Number.parseInt(req.query.size, 10);
              page = 1;
              if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
                page = pageAsNumber;
              }
              size = 20;
              if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
              }
              offset = (page - 1) * size;
              _context2.prev = 7;
              // GET USER ID FROM LOCALS
              userId = res.locals.id; // GET WISHLIST
              _context2.next = 11;
              return wishlist.findAndCountAll({
                where: {
                  userId: userId
                },
                include: [{
                  model: product,
                  as: 'product',
                  attributes: ['name', 'price', 'image']
                }],
                limit: size,
                offset: offset
              });
            case 11:
              wishlistProd = _context2.sent;
              totalPages = Math.ceil(wishlistProd.count / size);
              currentPage = page > totalPages ? totalPages : page;
              prevPage = currentPage === 1 ? null : currentPage - 1;
              nextPage = currentPage === totalPages ? null : currentPage + 1;
              if (!(wishlistProd.rows.length === 0)) {
                _context2.next = 18;
                break;
              }
              return _context2.abrupt("return", res.status(200).json({
                message: "There is no items found on page ".concat(page)
              }));
            case 18:
              // RETURN RESPONSE
              res.status(200).json({
                ok: true,
                message: "You have ".concat(wishlistProd.count, " products to your wishlist "),
                data: {
                  totalItems: wishlistProd.count,
                  totalPages: totalPages,
                  pageSize: size,
                  currentPage: currentPage,
                  prevPage: prevPage,
                  nextPage: nextPage,
                  availableProducts: wishlistProd.rows
                }
              });
              // CATCH ERROR
              _context2.next = 24;
              break;
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](7);
              return _context2.abrupt("return", res.status(500).json({
                status: 'Getting wishlist failed',
                message: _context2.t0.message
              }));
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[7, 21]]);
      }));
      function getWishlist(_x3, _x4) {
        return _getWishlist.apply(this, arguments);
      }
      return getWishlist;
    }() // DELETE SINGLE PRODUCT FROM WISHLIST
  }, {
    key: "deleteSingleProduct",
    value: function () {
      var _deleteSingleProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var userId, productId, wishlistProductExists;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              userId = res.locals.id;
              productId = req.params.id; // CHECK IF PRODUCT IS NOT AVAILABLE IN WISHLIST
              _context3.next = 5;
              return wishlist.findOne({
                where: {
                  productId: productId,
                  userId: userId
                }
              });
            case 5:
              wishlistProductExists = _context3.sent;
              if (wishlistProductExists) {
                _context3.next = 8;
                break;
              }
              return _context3.abrupt("return", res.status(404).json({
                message: 'Product not found in wishlist'
              }));
            case 8:
              _context3.next = 10;
              return wishlist.destroy({
                where: {
                  productId: productId,
                  userId: userId
                }
              });
            case 10:
              // RETURN RESPONSE
              res.status(200).json({
                ok: true,
                message: 'Product deleted successfully'
              });
              _context3.next = 16;
              break;
            case 13:
              _context3.prev = 13;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json({
                message: _context3.t0.message
              }));
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 13]]);
      }));
      function deleteSingleProduct(_x5, _x6) {
        return _deleteSingleProduct.apply(this, arguments);
      }
      return deleteSingleProduct;
    }() // DELETING THE WISHLIST
  }, {
    key: "deleteWishlist",
    value: function () {
      var _deleteWishlist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var userId;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              userId = res.locals.id;
              _context4.next = 4;
              return wishlist.destroy({
                where: {
                  userId: userId
                }
              });
            case 4:
              res.status(200).json({
                message: 'wishlist deleted successfully'
              });
              _context4.next = 10;
              break;
            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).json({
                status: 'Failed to delete wishlist',
                message: _context4.t0.message
              }));
            case 10:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 7]]);
      }));
      function deleteWishlist(_x7, _x8) {
        return _deleteWishlist.apply(this, arguments);
      }
      return deleteWishlist;
    }()
  }]);
  return wishlistController;
}();
var _default = wishlistController;
exports["default"] = _default;