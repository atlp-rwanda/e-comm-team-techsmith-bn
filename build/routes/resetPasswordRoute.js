"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _resetPassword = require("../controllers/resetPassword");
var resetPasswordRoute = _express["default"].Router();
resetPasswordRoute.post('/requestReset', _resetPassword.requestReset);
resetPasswordRoute.post('/resetPassword/:token', _resetPassword.processReset);
var _default = resetPasswordRoute;
exports["default"] = _default;