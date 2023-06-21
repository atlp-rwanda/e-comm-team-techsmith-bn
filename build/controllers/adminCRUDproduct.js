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
var _productValidation = _interopRequireDefault(require("../utils/productValidation.js"));
// CONFIG DOTENV
_dotenv["default"].config();

// IMPORT MODEL PRODUCT
var product = _index["default"].product,
  user = _index["default"].user;
var logger = require('./logger');
var productController = /*#__PURE__*/function () {
  function productController() {
    (0, _classCallCheck2["default"])(this, productController);
  }
  (0, _createClass2["default"])(productController, null, [{
    key: "addProduct",
    value: function () {
      var _addProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, name, quantity, price, categoryId, image, description, expiryDate, condition, sellerId, duplicateProduct, _validateProductInput, error, newProduct;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, quantity = _req$body.quantity, price = _req$body.price, categoryId = _req$body.categoryId, image = _req$body.image, description = _req$body.description, expiryDate = _req$body.expiryDate, condition = _req$body.condition, sellerId = _req$body.sellerId;
              _context.prev = 1;
              _context.next = 4;
              return product.findOne({
                where: {
                  name: name
                }
              });
            case 4:
              duplicateProduct = _context.sent;
              _validateProductInput = (0, _productValidation["default"])(req.body), error = _validateProductInput.error;
              if (!error) {
                _context.next = 9;
                break;
              }
              logger.productLogger.error("/POST statusCode: 400 : ".concat(error.details[0].message));
              return _context.abrupt("return", res.status(400).json({
                message: error.details[0].message
              }));
            case 9:
              if (!duplicateProduct) {
                _context.next = 12;
                break;
              }
              logger.productLogger.error('/POST statusCode: 409 : Duplicate found');
              return _context.abrupt("return", res.status(409).json({
                message: 'The product already exist, You can update its details only',
                data: duplicateProduct
              }));
            case 12:
              _context.next = 14;
              return product.create({
                userId: sellerId,
                name: name,
                quantity: quantity,
                price: price,
                categoryId: categoryId,
                description: description,
                isAvailable: true,
                expiryDate: expiryDate,
                image: image,
                condition: condition,
                include: {
                  model: user,
                  as: 'user',
                  attributes: ['name', 'email']
                }
              });
            case 14:
              newProduct = _context.sent;
              logger.productLogger.info('/POST statusCode: 201 : Admin succesfully created product');
              return _context.abrupt("return", res.status(201).json({
                ok: true,
                message: 'Product created successfully',
                data: newProduct
              }));
            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](1);
              logger.productLogger.error("/POST statCode: 500 : ".concat(_context.t0.message));
              return _context.abrupt("return", res.status(500).json({
                status: 'Adding product failed',
                message: _context.t0.message
              }));
            case 23:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 19]]);
      }));
      function addProduct(_x, _x2) {
        return _addProduct.apply(this, arguments);
      }
      return addProduct;
    }()
  }, {
    key: "findAllproducts",
    value: function () {
      var _findAllproducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var products;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return product.findAll({
                include: {
                  model: user,
                  as: 'user',
                  attributes: ['name', 'email']
                }
              });
            case 3:
              products = _context2.sent;
              if (!(products.length <= 0)) {
                _context2.next = 7;
                break;
              }
              logger.productLogger.info('/GET statusCode: 200 : Zero product found in collection');
              return _context2.abrupt("return", res.status(200).json({
                ok: false,
                message: 'There are no products in the stock'
              }));
            case 7:
              logger.productLogger.info('/GET statusCode: 200 : All Products fetched by Admin');
              return _context2.abrupt("return", res.status(200).json({
                ok: true,
                message: " ".concat(products.length, " products found"),
                data: products
              }));
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              logger.productLogger.error("/GET statusCode: 500 : Fetching product by Admin failed : ".concat(_context2.t0.message));
              return _context2.abrupt("return", res.status(500).json({
                status: 'Getting product failure',
                message: _context2.t0.message
              }));
            case 15:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 11]]);
      }));
      function findAllproducts(_x3, _x4) {
        return _findAllproducts.apply(this, arguments);
      }
      return findAllproducts;
    }() // DELETE A SEPCIFIC PRODUCT
  }, {
    key: "deleteProduct",
    value: function () {
      var _deleteProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, productExist, _deleteProduct2;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              id = req.params.id; // CHECK IF A PRODUCT EXIST IN STOCK
              _context3.next = 4;
              return product.findOne({
                where: {
                  id: id
                }
              });
            case 4:
              productExist = _context3.sent;
              if (productExist) {
                _context3.next = 8;
                break;
              }
              logger.productLogger.error('/DELETE statusCode: 404 :Item not found in stock ');
              return _context3.abrupt("return", res.status(404).json({
                message: 'The product no longer exists in the stock!'
              }));
            case 8:
              _context3.next = 10;
              return product.destroy({
                where: {
                  id: id
                }
              });
            case 10:
              _deleteProduct2 = _context3.sent;
              if (!_deleteProduct2) {
                _context3.next = 14;
                break;
              }
              logger.productLogger.info("/DELETE statusCode: 200 : product with id=".concat(id, " deleted successful by Admin"));
              return _context3.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Product successfully deleted'
              }));
            case 14:
              logger.productLogger.info('/DELETE statusCode: 400 : Wrong input, product not deleted');
              return _context3.abrupt("return", res.status(400).json({
                ok: false,
                message: 'Not deleted!'
              }));
            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](0);
              logger.productLogger.error(" / DELETE statusCode: 500 : Delete a product by Admin failed: ".concat(_context3.t0.message));
              return _context3.abrupt("return", res.status(500).json({
                message: _context3.t0.message
              }));
            case 22:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 18]]);
      }));
      function deleteProduct(_x5, _x6) {
        return _deleteProduct.apply(this, arguments);
      }
      return deleteProduct;
    }()
  }, {
    key: "updateProduct",
    value: function () {
      var _updateProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var _req$body2, name, quantity, price, categoryId, image, description, expiryDate, condition, id, productExist, _validateProductInput2, error, _updateProduct2;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _req$body2 = req.body, name = _req$body2.name, quantity = _req$body2.quantity, price = _req$body2.price, categoryId = _req$body2.categoryId, image = _req$body2.image, description = _req$body2.description, expiryDate = _req$body2.expiryDate, condition = _req$body2.condition;
              _context4.prev = 1;
              // GET PRODUCT ID FROM THE PARAMS
              id = req.params.id; // CHECK IF PRODUCT EXISTS
              _context4.next = 5;
              return product.findOne({
                where: {
                  id: id
                }
              });
            case 5:
              productExist = _context4.sent;
              if (productExist) {
                _context4.next = 9;
                break;
              }
              logger.productLogger.error('/PUT statusCode: 404 :Item not found in stock ');
              return _context4.abrupt("return", res.status(404).json({
                message: "The product doesn't exists in your collection!"
              }));
            case 9:
              // VALIDATE INPUTS
              _validateProductInput2 = (0, _productValidation["default"])(req.body), error = _validateProductInput2.error;
              if (!error) {
                _context4.next = 13;
                break;
              }
              logger.productLogger.error(" / PUT statusCode: 400: validation failed: $ { error.details[0].message }\n                            ");
              return _context4.abrupt("return", res.status(400).json({
                message: error.details[0].message
              }));
            case 13:
              _context4.next = 15;
              return product.update({
                name: name,
                quantity: quantity,
                price: price,
                categoryId: categoryId,
                image: image,
                description: description,
                expiryDate: expiryDate,
                condition: condition
              }, {
                where: {
                  id: id
                },
                returning: true,
                include: {
                  model: user,
                  as: 'user',
                  attributes: ['name', 'email']
                }
              });
            case 15:
              _updateProduct2 = _context4.sent;
              if (!_updateProduct2) {
                _context4.next = 19;
                break;
              }
              logger.productLogger.error(" / PUT statusCode: 200: Product details with id=".concat(id, " edited successfully by Admin "));
              return _context4.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Product details successfully updated!'
              }));
            case 19:
              _context4.next = 25;
              break;
            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4["catch"](1);
              logger.productLogger.error(" / PUT statusCode: 500: Edit product details failed: ".concat(_context4.t0.details[0].message, " "));
              return _context4.abrupt("return", res.status(500).json({
                ok: false,
                message: _context4.t0.message
              }));
            case 25:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 21]]);
      }));
      function updateProduct(_x7, _x8) {
        return _updateProduct.apply(this, arguments);
      }
      return updateProduct;
    }() // GET A SPECIFIC PRODUCT
  }, {
    key: "findProductById",
    value: function () {
      var _findProductById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, productExist;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id;
              _context5.next = 4;
              return product.findOne({
                where: {
                  id: id
                },
                include: [{
                  model: user,
                  as: 'user',
                  attributes: ['name', 'email']
                }]
              });
            case 4:
              productExist = _context5.sent;
              if (productExist) {
                _context5.next = 8;
                break;
              }
              logger.productLogger.error('/GET statusCode: 404 :Item not found in database');
              return _context5.abrupt("return", res.status(404).json({
                message: 'Product not found!'
              }));
            case 8:
              logger.productLogger.info('/GET statusCode: 200 : a product found');
              return _context5.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Product found!',
                data: productExist
              }));
            case 12:
              _context5.prev = 12;
              _context5.t0 = _context5["catch"](0);
              logger.productLogger.error(" / GET statusCode: 500: Fetching one product by ID failed: $ { error.message }\n                            ");
              return _context5.abrupt("return", res.status(500).json({
                ok: false,
                message: _context5.t0.message
              }));
            case 16:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 12]]);
      }));
      function findProductById(_x9, _x10) {
        return _findProductById.apply(this, arguments);
      }
      return findProductById;
    }()
  }]);
  return productController;
}();
var _default = productController;
exports["default"] = _default;