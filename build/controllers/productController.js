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
var _productValidation = _interopRequireDefault(require("../utils/productValidation.js"));
var _getIdAndDate = _interopRequireDefault(require("../utils/getIdAndDate.js"));
var _server = require("../server.js");
var _notificationController = _interopRequireDefault(require("./notificationController.js"));
var _productSearch = _interopRequireDefault(require("../utils/productSearch.js"));
var _uploads = _interopRequireDefault(require("../utils/uploads.js"));
var Sequelize = require('sequelize');
var logger = require('./logger');

// IMPORT SEQUELIZE OPERATORS
var Op = Sequelize.Op;

// CONFIG DOTENV
_dotenv["default"].config();

// IMPORT MODEL PRODUCT
var product = _index["default"].product,
  user = _index["default"].user,
  category = _index["default"].category;
var ProductController = /*#__PURE__*/function () {
  function ProductController() {
    (0, _classCallCheck2["default"])(this, ProductController);
  }
  (0, _createClass2["default"])(ProductController, null, [{
    key: "addProduct",
    value: // CREATE NEW PRODUCT
    function () {
      var _addProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body, name, quantity, price, image, description, expiryDate, condition, categoryId, id, duplicateProduct, _validateProductInput, error, categoryExists, newCategory, imageUrls, newProduct, payload;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _req$body = req.body, name = _req$body.name, quantity = _req$body.quantity, price = _req$body.price, image = _req$body.image, description = _req$body.description, expiryDate = _req$body.expiryDate, condition = _req$body.condition;
              categoryId = req.body.categoryId; // CATCH USER ID FROM MIDDLEWARE
              id = res.locals.id;
              /* eslint-disable no-console */
              _context2.prev = 3;
              _context2.next = 6;
              return product.findOne({
                where: {
                  name: name,
                  userId: id
                }
              });
            case 6:
              duplicateProduct = _context2.sent;
              _validateProductInput = (0, _productValidation["default"])(req.body), error = _validateProductInput.error;
              if (!error) {
                _context2.next = 11;
                break;
              }
              logger.productLogger.error("/POST statusCode: 400 : ".concat(error.details[0].message));
              return _context2.abrupt("return", res.status(400).json({
                message: error.details[0].message
              }));
            case 11:
              if (!duplicateProduct) {
                _context2.next = 14;
                break;
              }
              logger.productLogger.error('/POST statusCode: 409 : Duplicate found');
              return _context2.abrupt("return", res.status(409).json({
                message: 'The product already exist, You can update its details only',
                data: duplicateProduct
              }));
            case 14:
              _context2.next = 16;
              return category.findOne({
                where: {
                  id: categoryId
                }
              });
            case 16:
              categoryExists = _context2.sent;
              if (categoryExists) {
                _context2.next = 28;
                break;
              }
              _context2.prev = 18;
              _context2.next = 21;
              return category.create({
                name: 'New Category'
              });
            case 21:
              newCategory = _context2.sent;
              categoryId = newCategory.id;
              // CATCH ERROR IF ANY
              _context2.next = 28;
              break;
            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](18);
              return _context2.abrupt("return", _context2.t0);
            case 28:
              _context2.next = 30;
              return Promise.all(image.map( /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(img) {
                  var imageUrl;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return (0, _uploads["default"])(img, 'products');
                      case 2:
                        imageUrl = _context.sent;
                        return _context.abrupt("return", imageUrl.url);
                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function (_x3) {
                  return _ref.apply(this, arguments);
                };
              }()));
            case 30:
              imageUrls = _context2.sent;
              _context2.next = 33;
              return product.create({
                userId: id,
                name: name,
                quantity: quantity,
                price: price,
                categoryId: categoryId,
                description: description,
                expiryDate: expiryDate,
                image: imageUrls,
                condition: condition,
                include: {
                  model: user,
                  as: 'user',
                  attributes: ['name', 'email']
                },
                isAvailable: true
              });
            case 33:
              newProduct = _context2.sent;
              logger.productLogger.info('/POST statusCode: 201 : user succesfully created product');
              // CREATE NOTIFICATION
              payload = {
                userId: id,
                title: 'New product created',
                body: "Your product ".concat(name, " has been added successfully")
              };
              _context2.next = 38;
              return _notificationController["default"].createNotification(id, payload.title, payload.body);
            case 38:
              // SEND NOTIFICATION TO CLIENT
              _server.io.emit('createProductSuccess', payload);
              // RETURN RESPONSE
              logger.productLogger.info('/POST statusCode: 201 : user succesfully created product');
              // RETURN RESPONSE
              return _context2.abrupt("return", res.status(201).json({
                ok: true,
                message: 'Product created successfully',
                data: newProduct
              }));
            case 43:
              _context2.prev = 43;
              _context2.t1 = _context2["catch"](3);
              logger.productLogger.error("/POST statCode: 500 : ".concat(_context2.t1.message));
              // SEND NOTIFICATION TO CLIENT
              _server.io.emit('createProductError', _context2.t1.message);
              logger.productLogger.error("/POST statCode: 500 : ".concat(_context2.t1.message));
              // SEND NOTIFICATION TO CLIENT
              _server.io.emit('createProductError', _context2.t1.message);
              return _context2.abrupt("return", res.status(500).json({
                status: 'Adding product failed',
                message: _context2.t1
              }));
            case 50:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[3, 43], [18, 25]]);
      }));
      function addProduct(_x, _x2) {
        return _addProduct.apply(this, arguments);
      }
      return addProduct;
    }() // FIND ALL PRODUCTS
  }, {
    key: "findAllproducts",
    value: function () {
      var _findAllproducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var pageAsNumber, sizeAsNumber, page, size, offset, products, totalPages, currentPage, prevPage, nextPage;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
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
              _context3.prev = 7;
              _context3.next = 10;
              return product.findAndCountAll({
                include: {
                  model: user,
                  as: 'user',
                  attributes: ['name', 'email']
                },
                limit: size,
                offset: offset
              });
            case 10:
              products = _context3.sent;
              totalPages = Math.ceil(products.count / size);
              currentPage = page > totalPages ? totalPages : page;
              prevPage = currentPage === 1 ? null : currentPage - 1;
              nextPage = currentPage === totalPages ? null : currentPage + 1;
              if (!(products.rows.length === 0)) {
                _context3.next = 18;
                break;
              }
              logger.productLogger.error('/GET statusCode: 404 : No  item found on page');
              return _context3.abrupt("return", res.status(404).json({
                message: "There is no items found on page ".concat(page)
              }));
            case 18:
              if (!(products.length <= 0)) {
                _context3.next = 21;
                break;
              }
              logger.productLogger.info('/GET statusCode: 200 : Zero product found in collection');
              return _context3.abrupt("return", res.status(200).json({
                ok: false,
                message: 'You have no product in your collection'
              }));
            case 21:
              logger.productLogger.info('/GET statusCode: 200 : All Products fetched ');
              return _context3.abrupt("return", res.status(200).json({
                ok: true,
                message: " ".concat(products.count, " products found"),
                data: {
                  totalItems: products.count,
                  totalPages: totalPages,
                  pageSize: size,
                  currentPage: currentPage,
                  prevPage: prevPage,
                  nextPage: nextPage,
                  products: products.rows
                }
              }));
            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3["catch"](7);
              logger.productLogger.error("/GET statusCode: 500 : Fetching product failed : ".concat(_context3.t0.message));
              return _context3.abrupt("return", res.status(500).json({
                status: 'Getting product failure',
                message: _context3.t0.message
              }));
            case 29:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[7, 25]]);
      }));
      function findAllproducts(_x4, _x5) {
        return _findAllproducts.apply(this, arguments);
      }
      return findAllproducts;
    }() // A SELLER SEE ALL HIS PRODUCTS
  }, {
    key: "myCollectionProducts",
    value: function () {
      var _myCollectionProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var pageAsNumber, sizeAsNumber, page, size, offset, id, products, totalPages, currentPage, prevPage, nextPage;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
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
              _context4.prev = 7;
              id = res.locals.id;
              _context4.next = 11;
              return product.findAndCountAll({
                where: {
                  userId: id
                },
                include: [{
                  model: user,
                  as: 'user',
                  attributes: ['name']
                }],
                limit: size,
                offset: offset
              });
            case 11:
              products = _context4.sent;
              totalPages = Math.ceil(products.count / size);
              currentPage = page > totalPages ? totalPages : page;
              prevPage = currentPage === 1 ? null : currentPage - 1;
              nextPage = currentPage === totalPages ? null : currentPage + 1;
              if (!(products.rows.length === 0)) {
                _context4.next = 19;
                break;
              }
              logger.productLogger.error('/GET statusCode: 404 :Item not found on page');
              return _context4.abrupt("return", res.status(404).json({
                message: "There is no items found on page ".concat(page)
              }));
            case 19:
              if (!(products.length <= 0)) {
                _context4.next = 22;
                break;
              }
              logger.productLogger.info('/GET statusCode: 200 : Zero product found in collection');
              return _context4.abrupt("return", res.status(200).json({
                ok: false,
                message: 'You have no product in your collection'
              }));
            case 22:
              logger.productLogger.info('/GET statusCode: 200 : All Products fetched ');
              return _context4.abrupt("return", res.status(200).json({
                ok: true,
                message: "There are ".concat(products.count, " products found"),
                data: {
                  totalItems: products.count,
                  totalPages: totalPages,
                  pageSize: size,
                  currentPage: currentPage,
                  prevPage: prevPage,
                  nextPage: nextPage,
                  products: products.rows
                }
              }));
            case 26:
              _context4.prev = 26;
              _context4.t0 = _context4["catch"](7);
              logger.productLogger.error("/GET statusCode: 500 : Fetching product in collection failed : ".concat(_context4.t0.message));
              return _context4.abrupt("return", res.status(500).json({
                status: 'Getting product failed',
                message: _context4.t0.message
              }));
            case 30:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[7, 26]]);
      }));
      function myCollectionProducts(_x6, _x7) {
        return _myCollectionProducts.apply(this, arguments);
      }
      return myCollectionProducts;
    }() // USER CAN GET ALL AVAILABLE PRODUCTS
  }, {
    key: "allAvailableProducts",
    value: function () {
      var _allAvailableProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var pageAsNumber, sizeAsNumber, page, size, offset, availableProducts, totalPages, currentPage, prevPage, nextPage;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
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
              _context5.prev = 7;
              _context5.next = 10;
              return product.findAndCountAll({
                where: {
                  isAvailable: true
                },
                include: [{
                  model: user,
                  as: 'user',
                  attributes: ['name']
                }],
                limit: size,
                offset: offset
              });
            case 10:
              availableProducts = _context5.sent;
              totalPages = Math.ceil(availableProducts.count / size);
              currentPage = page > totalPages ? totalPages : page;
              prevPage = currentPage === 1 ? null : currentPage - 1;
              nextPage = currentPage === totalPages ? null : currentPage + 1;
              if (!(availableProducts.rows.length === 0)) {
                _context5.next = 18;
                break;
              }
              logger.productLogger.error('/GET statusCode: 404 :Item not found on page');
              return _context5.abrupt("return", res.status(404).json({
                message: "There is no items found on page ".concat(page)
              }));
            case 18:
              if (!(availableProducts < 1)) {
                _context5.next = 21;
                break;
              }
              logger.productLogger.info('/GET statusCode: 200 : All products are sold');
              return _context5.abrupt("return", res.status(200).json({
                message: 'All products are sold'
              }));
            case 21:
              logger.productLogger.info('/GET statusCode: 200 : Available  Products fetched ');
              return _context5.abrupt("return", res.status(200).json({
                ok: true,
                message: "There are ".concat(availableProducts.count, " Available products in the stock"),
                data: {
                  totalItems: availableProducts.count,
                  totalPages: totalPages,
                  pageSize: size,
                  currentPage: currentPage,
                  prevPage: prevPage,
                  nextPage: nextPage,
                  availableProducts: availableProducts.rows
                }
              }));
            case 25:
              _context5.prev = 25;
              _context5.t0 = _context5["catch"](7);
              logger.productLogger.error("/GET statusCode: 500 : Fetching available products failed : ".concat(_context5.t0.message));
              return _context5.abrupt("return", res.status(500).json({
                message: _context5.t0.message
              }));
            case 29:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[7, 25]]);
      }));
      function allAvailableProducts(_x8, _x9) {
        return _allAvailableProducts.apply(this, arguments);
      }
      return allAvailableProducts;
    }() // BUYER CAN GET SPECIFIC ITEM FROM AVAILABLE
  }, {
    key: "buyerGetProduct",
    value: function () {
      var _buyerGetProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var id, availableProduct;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = req.params.id;
              _context6.prev = 1;
              _context6.next = 4;
              return product.findOne({
                where: {
                  isAvailable: true,
                  id: id
                }
              });
            case 4:
              availableProduct = _context6.sent;
              if (!availableProduct) {
                _context6.next = 8;
                break;
              }
              logger.productLogger.info('/GET statusCode: 200 : Search of specific product is successful ');
              return _context6.abrupt("return", res.status(200).json({
                status: "successfully retrived product of id ".concat(id),
                message: availableProduct
              }));
            case 8:
              logger.productLogger.info('/GET statusCode: 404 : Id of searched product does not found');
              return _context6.abrupt("return", res.status(404).json({
                status: 'fail',
                message: "The product with this id ".concat(id, " doesn't exist")
              }));
            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](1);
              logger.productLogger.error("/GET statusCode: 500 : Searching a product failed : ".concat(_context6.t0.message));
              return _context6.abrupt("return", res.status(500).json({
                message: _context6.t0.message
              }));
            case 16:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[1, 12]]);
      }));
      function buyerGetProduct(_x10, _x11) {
        return _buyerGetProduct.apply(this, arguments);
      }
      return buyerGetProduct;
    }() // A  SELLER CAN SEE AVAILABLE PRODUCTS IN HIS COOOLECTION
  }, {
    key: "availableProducts",
    value: function () {
      var _availableProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var id, _availableProducts2;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              id = res.locals.id;
              _context7.prev = 1;
              _context7.next = 4;
              return product.findAll({
                where: {
                  isAvailable: true,
                  userId: id
                },
                include: [{
                  model: user,
                  as: 'user',
                  attributes: ['name']
                }]
              });
            case 4:
              _availableProducts2 = _context7.sent;
              if (!(_availableProducts2.length < 1)) {
                _context7.next = 8;
                break;
              }
              logger.productLogger.info('/GET statusCode: 200 : All products are sold');
              return _context7.abrupt("return", res.status(200).json({
                message: 'All products are sold'
              }));
            case 8:
              logger.productLogger.info('/GET statusCode: 200 : Available  Products in collection fetched ');
              return _context7.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Available products in your collection:',
                data: _availableProducts2
              }));
            case 12:
              _context7.prev = 12;
              _context7.t0 = _context7["catch"](1);
              logger.productLogger.error("/GET statusCode: 500 : Fetching available products in collection failed : ".concat(_context7.t0.message));
              return _context7.abrupt("return", res.status(500).json({
                message: 'Server error'
              }));
            case 16:
            case "end":
              return _context7.stop();
          }
        }, _callee7, null, [[1, 12]]);
      }));
      function availableProducts(_x12, _x13) {
        return _availableProducts.apply(this, arguments);
      }
      return availableProducts;
    }() // EXPIRATION OF PRODUCTS
  }, {
    key: "expirationOfProducts",
    value: function () {
      var _expirationOfProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var currentDate, products, foundUser, expiredProducts;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              currentDate = new Date();
              _context9.next = 4;
              return product.findAll();
            case 4:
              products = _context9.sent;
              expiredProducts = (0, _getIdAndDate["default"])(products).filter(function (prod) {
                return new Date(prod.expiryDate) < new Date(currentDate);
              });
              _context9.next = 8;
              return product.update({
                isAvailable: false
              }, {
                where: {
                  id: (0, _defineProperty2["default"])({}, Op["in"], expiredProducts.map(function (p) {
                    return p.id;
                  }))
                }
              });
            case 8:
              // CHECK EXPIRING PRODUCTS' USERS AND NOTIFY THEM
              expiredProducts.forEach( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(p) {
                  var payload;
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) switch (_context8.prev = _context8.next) {
                      case 0:
                        _context8.next = 2;
                        return user.findOne({
                          where: {
                            id: p.userId
                          }
                        });
                      case 2:
                        foundUser = _context8.sent;
                        logger.userLogger.info("/POST statusCode: 200 : Email sent successfully to ".concat(foundUser.email));
                        // CREATE NOTIFICATION IN DB
                        payload = {
                          userId: foundUser.id,
                          title: 'Product Expiring',
                          body: "Your product ".concat(p.name, " is expiring on ").concat(p.expiryDate)
                        };
                        _context8.next = 7;
                        return _notificationController["default"].createNotification(foundUser.id, payload.title, payload.body);
                      case 7:
                        // SEND NOTIFICATION TO CLIENT
                        _server.io.emit('productExpired', payload);
                      case 8:
                      case "end":
                        return _context8.stop();
                    }
                  }, _callee8);
                }));
                return function (_x16) {
                  return _ref2.apply(this, arguments);
                };
              }());
              return _context9.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Product expiration check completed',
                exprired_Products: expiredProducts
              }));
            case 12:
              _context9.prev = 12;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", res.status(500).json({
                status: 'Getting product failure',
                message: _context9.t0.message
              }));
            case 15:
            case "end":
              return _context9.stop();
          }
        }, _callee9, null, [[0, 12]]);
      }));
      function expirationOfProducts(_x14, _x15) {
        return _expirationOfProducts.apply(this, arguments);
      }
      return expirationOfProducts;
    }() // GET ONE FROM MINE
  }, {
    key: "getOneFromMine",
    value: function () {
      var _getOneFromMine = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var pId, loggedInUserId, productExist;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              pId = req.params.id; // Getting logged in user's id
              loggedInUserId = res.locals.id; // CHECK IF PRODUCT EXISTS
              _context10.next = 5;
              return product.findOne({
                where: {
                  id: pId,
                  userId: loggedInUserId
                }
              });
            case 5:
              productExist = _context10.sent;
              if (productExist) {
                _context10.next = 8;
                break;
              }
              return _context10.abrupt("return", res.status(404).json({
                message: "The product doesn't exists in your collection!"
              }));
            case 8:
              return _context10.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Product found',
                data: productExist
              }));
            case 11:
              _context10.prev = 11;
              _context10.t0 = _context10["catch"](0);
              return _context10.abrupt("return", res.status(500).json({
                message: " The product doesn't exists in your collection!"
              }));
            case 14:
            case "end":
              return _context10.stop();
          }
        }, _callee10, null, [[0, 11]]);
      }));
      function getOneFromMine(_x17, _x18) {
        return _getOneFromMine.apply(this, arguments);
      }
      return getOneFromMine;
    }() // DELETE A SEPCIFIC PRODUCT
  }, {
    key: "deleteProduct",
    value: function () {
      var _deleteProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        var pId, loggedInUserId, productExist, _deleteProduct2, payload;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              pId = req.params.pId; // Getting logged in user's id
              loggedInUserId = res.locals.id; // CHECK IF PRODUCT EXISTS
              _context11.next = 5;
              return product.findOne({
                where: {
                  id: pId,
                  userId: loggedInUserId
                }
              });
            case 5:
              productExist = _context11.sent;
              if (productExist) {
                _context11.next = 8;
                break;
              }
              return _context11.abrupt("return", res.status(404).json({
                message: "The product doesn't exists in your collection!"
              }));
            case 8:
              _context11.next = 10;
              return product.destroy({
                where: {
                  id: pId
                }
              });
            case 10:
              _deleteProduct2 = _context11.sent;
              if (!_deleteProduct2) {
                _context11.next = 17;
                break;
              }
              // CREATE NOTIFICATION IN DB
              payload = {
                userId: loggedInUserId,
                title: 'Product Deleted',
                body: "Product deleted successfully"
              };
              _context11.next = 15;
              return _notificationController["default"].createNotification(loggedInUserId, payload.title, payload.body);
            case 15:
              // SEND NOTIFICATION TO CLIENT
              _server.io.emit('deleteProductSuccess', payload);
              // RETURN RESPONSE
              return _context11.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Product successfully deleted'
              }));
            case 17:
              return _context11.abrupt("return", res.status(400).json({
                ok: false,
                message: 'Not deleted!'
              }));
            case 20:
              _context11.prev = 20;
              _context11.t0 = _context11["catch"](0);
              // SEND ERROR MESSAGE TO CLIENT
              _server.io.emit('deleteProductError', {
                message: 'Product not deleted!'
              });
              // RETURN ERROR MESSAGE
              return _context11.abrupt("return", res.status(500).json({
                message: 'Server error'
              }));
            case 24:
            case "end":
              return _context11.stop();
          }
        }, _callee11, null, [[0, 20]]);
      }));
      function deleteProduct(_x19, _x20) {
        return _deleteProduct.apply(this, arguments);
      }
      return deleteProduct;
    }() // UPDATE A PRODUCT
  }, {
    key: "updateProduct",
    value: function () {
      var _updateProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
        var _req$body2, name, price, categoryId, image, description, expiryDate, condition, quantity, id, loggedInUserId, productExist, _validateProductInput2, error, imageUrls, _updateProduct2, payload;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _req$body2 = req.body, name = _req$body2.name, price = _req$body2.price, categoryId = _req$body2.categoryId, image = _req$body2.image, description = _req$body2.description, expiryDate = _req$body2.expiryDate, condition = _req$body2.condition, quantity = _req$body2.quantity;
              _context13.prev = 1;
              // GET PRODUCT ID FROM THE PARAMS
              id = req.params.id; // GET LOGGED IN USER ID FROM LOCAL RESPONSES
              loggedInUserId = res.locals.id; // CHECK IF PRODUCT EXISTS
              _context13.next = 6;
              return product.findOne({
                where: {
                  id: id
                }
              });
            case 6:
              productExist = _context13.sent;
              if (productExist) {
                _context13.next = 9;
                break;
              }
              return _context13.abrupt("return", res.status(404).json({
                message: "The product doesn't exists in your collection!"
              }));
            case 9:
              if (!(productExist.userId !== loggedInUserId)) {
                _context13.next = 11;
                break;
              }
              return _context13.abrupt("return", res.status(401).json({
                message: 'You are not authorized to edit this product! It belongs to another user'
              }));
            case 11:
              // VALIDATE INPUTS
              _validateProductInput2 = (0, _productValidation["default"])(req.body), error = _validateProductInput2.error;
              if (!error) {
                _context13.next = 14;
                break;
              }
              return _context13.abrupt("return", res.status(400).json({
                message: error.details[0].message
              }));
            case 14:
              imageUrls = null; // UPLOAD TO CLOUDINARY
              if (!image) {
                _context13.next = 19;
                break;
              }
              _context13.next = 18;
              return Promise.all(image.map( /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(img) {
                  var imageUrl;
                  return _regenerator["default"].wrap(function _callee12$(_context12) {
                    while (1) switch (_context12.prev = _context12.next) {
                      case 0:
                        _context12.next = 2;
                        return (0, _uploads["default"])(img, 'products');
                      case 2:
                        imageUrl = _context12.sent;
                        return _context12.abrupt("return", imageUrl.url);
                      case 4:
                      case "end":
                        return _context12.stop();
                    }
                  }, _callee12);
                }));
                return function (_x23) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 18:
              imageUrls = _context13.sent;
            case 19:
              _context13.next = 21;
              return product.update({
                name: name,
                price: price,
                quantity: quantity,
                categoryId: categoryId || productExist.categoryId,
                image: imageUrls || productExist.image,
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
            case 21:
              _updateProduct2 = _context13.sent;
              if (!_updateProduct2) {
                _context13.next = 28;
                break;
              }
              // CREATE NOTIFICATION IN DB
              payload = {
                userId: loggedInUserId,
                title: 'Product Updated',
                body: "Product updated successfully"
              };
              _context13.next = 26;
              return _notificationController["default"].createNotification(loggedInUserId, payload.title, payload.body);
            case 26:
              // SEND NOTIFICATION TO CLIENT
              _server.io.emit('updateProductSuccess', payload);
              return _context13.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Product details successfully updated!'
              }));
            case 28:
              _context13.next = 34;
              break;
            case 30:
              _context13.prev = 30;
              _context13.t0 = _context13["catch"](1);
              // SEND ERROR MESSAGE TO CLIENT
              _server.io.emit('updateProductError', {
                message: 'Product not updated!'
              });
              return _context13.abrupt("return", res.status(500).json({
                ok: false,
                message: _context13.t0.message
              }));
            case 34:
            case "end":
              return _context13.stop();
          }
        }, _callee13, null, [[1, 30]]);
      }));
      function updateProduct(_x21, _x22) {
        return _updateProduct.apply(this, arguments);
      }
      return updateProduct;
    }() // GET A SPECIFIC PRODUCT
  }, {
    key: "findProductById",
    value: function () {
      var _findProductById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
        var id, productExist;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              id = req.params.id;
              _context14.next = 4;
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
              productExist = _context14.sent;
              if (productExist) {
                _context14.next = 7;
                break;
              }
              return _context14.abrupt("return", res.status(404).json({
                message: 'Product not found!'
              }));
            case 7:
              return _context14.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Product found!',
                data: productExist
              }));
            case 10:
              _context14.prev = 10;
              _context14.t0 = _context14["catch"](0);
              return _context14.abrupt("return", res.status(500).json({
                ok: false,
                message: _context14.t0.message
              }));
            case 13:
            case "end":
              return _context14.stop();
          }
        }, _callee14, null, [[0, 10]]);
      }));
      function findProductById(_x24, _x25) {
        return _findProductById.apply(this, arguments);
      }
      return findProductById;
    }() // GET SINGLE PRODUCT
  }, {
    key: "getProduct",
    value: function () {
      var _getProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
        var _req$body3, name, price, categoryIds, _validateProductSearc, errors, token, products, _products, _products2, _products3;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              _req$body3 = req.body, name = _req$body3.name, price = _req$body3.price, categoryIds = _req$body3.categoryIds;
              _validateProductSearc = (0, _productSearch["default"])(req.body), errors = _validateProductSearc.errors;
              if (!errors) {
                _context15.next = 4;
                break;
              }
              return _context15.abrupt("return", res.status(400).json({
                message: errors.details[0].message
              }));
            case 4:
              token = req.headers.cookie;
              if (token) {
                _context15.next = 25;
                break;
              }
              _context15.prev = 6;
              if (!(name === null && price === null && categoryIds === null)) {
                _context15.next = 14;
                break;
              }
              _context15.next = 10;
              return product.findAll();
            case 10:
              products = _context15.sent;
              if (products.length <= 0) {
                res.status(404).json({
                  status: 'None',
                  message: 'no product found'
                });
              } else {
                res.status(200).json({
                  status: 'lIST OF PRODUCTS',
                  message: " ".concat(products.length, " products found"),
                  data: products
                });
              }
              _context15.next = 18;
              break;
            case 14:
              _context15.next = 16;
              return product.findAll({
                where: (0, _defineProperty2["default"])({}, Op.or, [{
                  name: (0, _defineProperty2["default"])({}, Op.like, "%".concat(name, "%"))
                }, {
                  categoryId: categoryIds
                }, {
                  price: price
                }])
              });
            case 16:
              _products = _context15.sent;
              if (_products.length <= 0) {
                res.status(404).json({
                  status: 'None',
                  message: 'no product found'
                });
              } else {
                res.status(200).json({
                  status: 'lIST OF PRODUCTS',
                  message: " ".concat(_products.length, " products found"),
                  data: _products
                });
              }
            case 18:
              _context15.next = 23;
              break;
            case 20:
              _context15.prev = 20;
              _context15.t0 = _context15["catch"](6);
              res.status(500).json({
                status: 'Getting product failure',
                message: _context15.t0.message
              });
            case 23:
              _context15.next = 42;
              break;
            case 25:
              _context15.prev = 25;
              if (!(name === null && price === null && categoryIds === null)) {
                _context15.next = 33;
                break;
              }
              _context15.next = 29;
              return product.findAll({
                where: {
                  userId: req.id
                }
              });
            case 29:
              _products2 = _context15.sent;
              if (_products2.length <= 0) {
                res.status(404).json({
                  status: 'None',
                  message: 'no product found'
                });
              } else {
                res.status(200).json({
                  status: 'lIST OF PRODUCTS',
                  message: " ".concat(_products2.length, " products found"),
                  data: _products2
                });
              }
              _context15.next = 37;
              break;
            case 33:
              _context15.next = 35;
              return product.findAll({
                where: (0, _defineProperty2["default"])({
                  userId: req.id
                }, Op.or, [{
                  name: (0, _defineProperty2["default"])({}, Op.like, "%".concat(name, "%"))
                }, {
                  categoryId: categoryIds
                }, {
                  price: price
                }])
              });
            case 35:
              _products3 = _context15.sent;
              if (_products3.length <= 0) {
                res.status(404).json({
                  status: 'None',
                  message: 'no product found'
                });
              } else {
                res.status(200).json({
                  status: 'lIST OF PRODUCTS',
                  message: " ".concat(_products3.length, " products found"),
                  data: _products3
                });
              }
            case 37:
              _context15.next = 42;
              break;
            case 39:
              _context15.prev = 39;
              _context15.t1 = _context15["catch"](25);
              res.status(500).json({
                status: 'Getting product failure',
                message: _context15.t1
              });
            case 42:
            case "end":
              return _context15.stop();
          }
        }, _callee15, null, [[6, 20], [25, 39]]);
      }));
      function getProduct(_x26, _x27) {
        return _getProduct.apply(this, arguments);
      }
      return getProduct;
    }()
  }]);
  return ProductController;
}();
var _default = ProductController;
exports["default"] = _default;