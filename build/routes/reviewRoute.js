"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _verifyIsBuyer = _interopRequireDefault(require("../middlewares/verifyIsBuyer"));
var _feedbackController = _interopRequireDefault(require("../controllers/feedbackController"));
var router = _express["default"].Router();

// CREATING FEEDBACK ON PRODUCTS

router.post('/:pId', _verifyIsBuyer["default"], _feedbackController["default"].createFeedback);

// GETTING FEEDBACK ON A PRODUCT
router.get('/:pId', _feedbackController["default"].allFeedback);
var _default = router;
exports["default"] = _default;