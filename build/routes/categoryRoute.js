"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _categoryController = _interopRequireDefault(require("../controllers/categoryController"));
var router = _express["default"].Router();
router.get('/', _categoryController["default"].fetchAllCategories);
router.get('/:id', _categoryController["default"].getCategoryById);
var _default = router;
exports["default"] = _default;