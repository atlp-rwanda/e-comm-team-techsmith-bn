"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function validateQuantity(_x, _x2, _x3, _x4) {
  return _validateQuantity.apply(this, arguments);
}
function _validateQuantity() {
  _validateQuantity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(model, modelId, desiredQuantity, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return model.findOne({
            where: {
              id: modelId
            }
          });
        case 3:
          result = _context.sent;
          if (!(desiredQuantity > result.dataValues.quantity)) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", false);
        case 6:
          return _context.abrupt("return", result.dataValues.quantity);
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _validateQuantity.apply(this, arguments);
}
var _default = validateQuantity;
exports["default"] = _default;