"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _joi = _interopRequireDefault(require("joi"));
var validateProductInput = function validateProductInput(schema) {
  return function (payload) {
    return schema.validate(payload, {
      abortEarly: false
    });
  };
};
var productSchema = _joi["default"].object({
  name: _joi["default"].string().allow(null),
  price: _joi["default"].number().allow(null),
  categoryIds: _joi["default"].number().allow(null)
});
var validateInput = validateProductInput(productSchema);
var _default = validateInput;
exports["default"] = _default;