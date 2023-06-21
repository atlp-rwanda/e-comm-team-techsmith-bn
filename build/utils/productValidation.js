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
  name: _joi["default"].string().trim().required(),
  price: _joi["default"].number().min(1).required(),
  quantity: _joi["default"].number().min(1).required(),
  categoryId: _joi["default"].number().required(),
  description: _joi["default"].string().trim().required(),
  condition: _joi["default"].string().trim(),
  image: _joi["default"].array().items(_joi["default"].string().trim().required()).min(4).max(8).unique(),
  expiryDate: _joi["default"].date().iso().allow(null),
  sellerId: _joi["default"].number()
});
var validateInput = validateProductInput(productSchema);
var _default = validateInput;
exports["default"] = _default;