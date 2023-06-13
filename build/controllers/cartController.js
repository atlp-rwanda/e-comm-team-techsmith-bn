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
// CONFIG DOTENV
_dotenv["default"].config();
// IMPORT MODEL PRODUCT
var product = _index["default"].product,
  cart = _index["default"].cart;
var logger = require('./logger');
var cartController = /*#__PURE__*/function () {
  function cartController() {
    (0, _classCallCheck2["default"])(this, cartController);
  }
  (0, _createClass2["default"])(cartController, null, [{
    key: "addToCart",
    value: function () {
      var _addToCart = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var productId, userId, prod, cartProductExists;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
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
                _context.next = 9;
                break;
              }
              logger.cartLogger.error('/POST statusCode: 404 :Item not found in stock ');
              return _context.abrupt("return", res.status(404).json({
                message: 'Product not found'
              }));
            case 9:
              _context.next = 11;
              return cart.findOne({
                where: {
                  productId: productId,
                  userId: userId
                }
              });
            case 11:
              cartProductExists = _context.sent;
              if (!(!cartProductExists === false)) {
                _context.next = 15;
                break;
              }
              logger.cartLogger.error('/POST statusCode: 409 :Duolicated fund in cart ');
              return _context.abrupt("return", res.status(409).json({
                message: 'Product already in cart'
              }));
            case 15:
              _context.next = 17;
              return cart.create({
                userId: userId,
                productId: productId
              });
            case 17:
              // RETURN RESPONSE
              logger.cartLogger.info('/POST statusCode: 201 :Item added in cart succesfully ');
              res.status(201).json({
                message: 'Items are added successfully'
              });
              // CATCH ERROR
              _context.next = 25;
              break;
            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              logger.cartLogger.error("/POST statusCode: 500 :Adding Item in cart failed: ".concat(_context.t0.message, " "));
              return _context.abrupt("return", res.status(500).json({
                status: 'Adding product into cart failed',
                message: _context.t0.message
              }));
            case 25:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 21]]);
      }));
      function addToCart(_x, _x2) {
        return _addToCart.apply(this, arguments);
      }
      return addToCart;
    }()
  }, {
    key: "viewCart",
    value: function () {
      var _viewCart = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var pageAsNumber, sizeAsNumber, page, size, offset, userId, cartItems, totalPages, currentPage, prevPage, nextPage, cartProducts;
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
              // Get the user ID from local variables
              userId = res.locals.id; // Find all cart items for the user
              _context2.next = 11;
              return cart.findAndCountAll({
                where: {
                  userId: userId
                },
                include: [{
                  model: product,
                  as: 'product',
                  attributes: ['id', 'name', 'price', 'image']
                }],
                limit: size,
                offset: offset
              });
            case 11:
              cartItems = _context2.sent;
              totalPages = Math.ceil(cartItems.count / size);
              currentPage = page > totalPages ? totalPages : page;
              prevPage = currentPage === 1 ? null : currentPage - 1;
              nextPage = currentPage === totalPages ? null : currentPage + 1;
              cartProducts = cartItems.rows.map(function (item) {
                return {
                  productId: item.product.id,
                  name: item.product.name,
                  price: item.product.price,
                  image: item.product.image
                };
              });
              logger.cartLogger.info('/GET statusCode: 200 : Retrieved content in cart');
              res.status(200).json({
                ok: true,
                message: "All ".concat(cartItems.count, " Cart contents retrieved successfully"),
                data: {
                  totalItems: cartItems.count,
                  totalPages: totalPages,
                  pageSize: size,
                  currentPage: currentPage,
                  prevPage: prevPage,
                  nextPage: nextPage,
                  itemsInCart: cartProducts
                }
              });
              _context2.next = 25;
              break;
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](7);
              logger.cartLogger.error("/GET statusCode: 500 : Fetching product in cart failed : ".concat(_context2.t0.message));
              return _context2.abrupt("return", res.status(500).json({
                status: 'Failed to retrieve cart contents',
                message: _context2.t0.message
              }));
            case 25:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[7, 21]]);
      }));
      function viewCart(_x3, _x4) {
        return _viewCart.apply(this, arguments);
      }
      return viewCart;
    }()
  }, {
    key: "clearCart",
    value: function () {
      var _clearCart = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var userId;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              userId = res.locals.id; // DELETING THE ITEMS
              _context3.next = 4;
              return cart.destroy({
                where: {
                  userId: userId
                }
              });
            case 4:
              logger.cartLogger.info('/DELETE statusCode: 200 : Cart cleared succesfully');
              return _context3.abrupt("return", res.status(200).json({
                message: 'Cart cleared successfully'
              }));
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              logger.cartLogger.error('/DELETE statusCode: 500 : Clear cart failed');
              return _context3.abrupt("return", res.status(500).json({
                status: 'Failed to clear cart',
                message: _context3.t0.message
              }));
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 8]]);
      }));
      function clearCart(_x5, _x6) {
        return _clearCart.apply(this, arguments);
      }
      return clearCart;
    }() // DELETE SINGLE ITEM FROM CART
  }, {
    key: "deleteSingleItem",
    value: function () {
      var _deleteSingleItem = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var userId, productId, cartItem;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              userId = res.locals.id;
              productId = req.params.id; // CHECK IF THE PRDUCT EXISTS IN THE CART
              _context4.next = 5;
              return cart.findOne({
                where: {
                  productId: productId,
                  userId: userId
                }
              });
            case 5:
              cartItem = _context4.sent;
              if (cartItem) {
                _context4.next = 8;
                break;
              }
              return _context4.abrupt("return", res.status(404).json({
                message: 'Product does not exist in cart'
              }));
            case 8:
              _context4.next = 10;
              return cart.destroy({
                where: {
                  productId: productId,
                  userId: userId
                }
              });
            case 10:
              return _context4.abrupt("return", res.status(200).json({
                ok: true,
                message: 'product successfully deleted from cart'
              }));
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(500).json({
                message: _context4.t0.message
              }));
            case 16:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 13]]);
      }));
      function deleteSingleItem(_x7, _x8) {
        return _deleteSingleItem.apply(this, arguments);
      }
      return deleteSingleItem;
    }()
  }, {
    key: "updateCart",
    value: function () {
      var _updateCart = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var userId, desiredQuantity, productId, _yield$product$findOn, quantity, cartItem, totalPrice, updatedCartItem, cartItems;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              userId = res.locals.id; // FETCHING THE PRODUCT ID AND NEW QUANTITY
              desiredQuantity = req.body.desiredQuantity;
              productId = req.params.id; // VALIDATING THE QUANTITY
              _context5.next = 6;
              return product.findOne({
                where: {
                  id: productId
                }
              });
            case 6:
              _yield$product$findOn = _context5.sent;
              quantity = _yield$product$findOn.quantity;
              if (!(desiredQuantity > quantity)) {
                _context5.next = 11;
                break;
              }
              logger.cartLogger.info('/PUT  :User required more quantity than in stock');
              return _context5.abrupt("return", res.json({
                Message: "The remaining quantity in stock is ".concat(quantity)
              }));
            case 11:
              _context5.next = 13;
              return cart.findOne({
                where: {
                  productId: productId,
                  userId: userId
                },
                include: [{
                  model: product,
                  as: 'product',
                  attributes: ['name', 'price', 'image']
                }]
              });
            case 13:
              cartItem = _context5.sent;
              if (cartItem) {
                _context5.next = 17;
                break;
              }
              logger.cartLogger.error('/PUT statusCode: 404 : Cart item not found');
              return _context5.abrupt("return", res.status(404).json({
                message: 'Cart item not found'
              }));
            case 17:
              // CALCULATING THE NEW TOTAL
              totalPrice = desiredQuantity * cartItem.product.price; // UPDATING THE QUANTITY
              _context5.next = 20;
              return cartItem.update({
                quantity: desiredQuantity,
                totalPrice: totalPrice
              });
            case 20:
              _context5.next = 22;
              return cart.findOne({
                where: {
                  productId: productId,
                  userId: userId
                },
                include: [{
                  model: product,
                  as: 'product',
                  attributes: ['name', 'price', 'image']
                }]
              });
            case 22:
              updatedCartItem = _context5.sent;
              cartItems = [updatedCartItem].map(function (item) {
                return {
                  name: item.product.name,
                  quantity: item.quantity,
                  totalPrice: item.totalPrice,
                  image: item.product.image
                };
              }); // console.log(updatedCartItem.desiredQuantity)
              logger.cartLogger.info('/PUT statusCode: 200 : Cart item updated succesfully');
              res.status(200).json({
                message: 'Cart item updated successfully',
                cart: cartItems
              });
              _context5.next = 32;
              break;
            case 28:
              _context5.prev = 28;
              _context5.t0 = _context5["catch"](0);
              logger.cartLogger.info("/PUT statusCode: 500 : Updating cart failed : ".concat(_context5.t0.message));
              return _context5.abrupt("return", res.status(500).json({
                status: 'Failed to update cart item',
                message: _context5.t0.message
              }));
            case 32:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 28]]);
      }));
      function updateCart(_x9, _x10) {
        return _updateCart.apply(this, arguments);
      }
      return updateCart;
    }()
  }]);
  return cartController;
}();
var _default = cartController;
exports["default"] = _default;