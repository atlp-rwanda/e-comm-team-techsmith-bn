"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _validatePayment = _interopRequireDefault(require("../middlewares/validatePayment"));
var _paymentsController = _interopRequireDefault(require("../controllers/paymentsController"));
var _orderController = _interopRequireDefault(require("../controllers/orderController.js"));
var _verifyIsAdmin = _interopRequireDefault(require("../middlewares/verifyIsAdmin.js"));
var _deliveredOrderController = _interopRequireDefault(require("../controllers/deliveredOrderController.js"));
var _verifyIsBuyer = _interopRequireDefault(require("../middlewares/verifyIsBuyer.js"));
var _verifyIsSeller = _interopRequireDefault(require("../middlewares/verifyIsSeller"));
var _server = require("../server");
var router = _express["default"].Router();

// CREATE A NEW PAYMENT
router.post('/:id/checkout', _validatePayment["default"], _paymentsController["default"].createPayment);

// GET ALL ORDERS
router.get('/', _verifyIsAdmin["default"], _orderController["default"].getOrders);

// GET SINGLE ORDER
router.get('/single/:orderId', _verifyIsBuyer["default"], _orderController["default"].singleOrder);

// FLAG ORDER AS DELIVERED
router.put('/delivered/:id', _verifyIsSeller["default"], _deliveredOrderController["default"].deliverOrder);
router.put('/cancelled/:id', _verifyIsBuyer["default"], _deliveredOrderController["default"].cancelDelivery);
router.put('/onWay/:id', _verifyIsSeller["default"], _deliveredOrderController["default"].deliveryMoving);

// CREATING ORDER
router.post('/', _verifyIsBuyer["default"], _orderController["default"].createOrder);
router.get('/status', function (req, res) {
  return res.render('status');
});

// GET SINGLE ORDER
router.get('/single/:orderId', _verifyIsBuyer["default"], _orderController["default"].singleOrder);

// FLAG ORDER AS DELIVERED
router.put('/delivered/:id', _verifyIsAdmin["default"], _deliveredOrderController["default"].deliverOrder);
router.put('/cancelled/:id', _verifyIsAdmin["default"], _deliveredOrderController["default"].cancelDelivery);

// CREATING ORDER
router.post('/', _verifyIsBuyer["default"], _orderController["default"].createOrder);

// UPDATING ORDER
router.put('/:oId', _verifyIsBuyer["default"], _orderController["default"].updateOrder);

// DELETING ORDER
router["delete"]('/:oId', _verifyIsBuyer["default"], _orderController["default"].deleteOrder);
router.get('/stat', function (req, res) {
  _server.io.emit('hello_mess', 'Hello there I am io');
  res.send({
    message: 'sent'
  });
});
router.get('/status', function (req, res) {
  res.render('status');
});
var _default = router;
exports["default"] = _default;