"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _productController = _interopRequireDefault(require("../controllers/productController.js"));
var _verifyIsSeller = _interopRequireDefault(require("../middlewares/verifyIsSeller"));
var _verifyIsBuyer = _interopRequireDefault(require("../middlewares/verifyIsBuyer.js"));
// SETUP ROUTER
var router = _express["default"].Router();

// GET ALL PRODUCTS
router.get('/', _productController["default"].findAllproducts);
router.get('/inStock', _productController["default"].allAvailableProducts);
router.get('/inMyStock', _verifyIsSeller["default"], _productController["default"].availableProducts);
router.get('/myStock', _verifyIsSeller["default"], _productController["default"].myCollectionProducts);
router.get('/', _productController["default"].findAllproducts);

// buyer get product by id
router.get('/getProduct/:id', _verifyIsBuyer["default"], _productController["default"].buyerGetProduct);

// CREATE SINGLE PRODUCT
router.post('/', _verifyIsSeller["default"], _productController["default"].addProduct);

// GET EXPIRED PRODUCTS
router.get('/expired', _productController["default"].expirationOfProducts);

// GET SINGLE PRODUCT
router.get('/:id', _productController["default"].findProductById);

// UPDATE PRODUCT
router.put('/:id', _verifyIsSeller["default"], _productController["default"].updateProduct);

// DELETE PRODUCT
router["delete"]('/:pId', _verifyIsSeller["default"], _productController["default"].deleteProduct);

// SEARCH PRODUCT
router.post('/search', _productController["default"].getProduct);

// Seller get single product from his available products
router.get('/mySingleProduct/:id', _verifyIsSeller["default"], _productController["default"].getOneFromMine);
var _default = router;
exports["default"] = _default;