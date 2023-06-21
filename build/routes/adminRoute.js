"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _adminController = _interopRequireDefault(require("../controllers/adminController.js"));
var _verifyIsAdmin = _interopRequireDefault(require("../middlewares/verifyIsAdmin.js"));
var _adminCRUDproduct = _interopRequireDefault(require("../controllers/adminCRUDproduct.js"));
var router = _express["default"].Router();

// USER REQUESTS
router.get('/users', _verifyIsAdmin["default"], _adminController["default"].getUsers);
router["delete"]('/users/:id', _verifyIsAdmin["default"], _adminController["default"].deleteUser);
router.post('/users', _verifyIsAdmin["default"], _adminController["default"].createUsers);
router.put('/users/:id', _verifyIsAdmin["default"], _adminController["default"].updateUser);

// PRODUCT REQUESTS
router.get('/products/:id', _verifyIsAdmin["default"], _adminCRUDproduct["default"].findProductById);
router.get('/products', _verifyIsAdmin["default"], _adminCRUDproduct["default"].findAllproducts);
router["delete"]('/products/:id', _verifyIsAdmin["default"], _adminCRUDproduct["default"].deleteProduct);
router.post('/products', _verifyIsAdmin["default"], _adminCRUDproduct["default"].addProduct);
router.put('/products/:id', _verifyIsAdmin["default"], _adminCRUDproduct["default"].updateProduct);
var _default = router;
exports["default"] = _default;