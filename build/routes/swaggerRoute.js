"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _index = _interopRequireDefault(require("../docs/index.js"));
// SETUP ROUTER

var router = _express["default"].Router();

// SETUP SWAGGER

router.use('/', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup((0, _swaggerJsdoc["default"])(_index["default"])));
var _default = router;
exports["default"] = _default;