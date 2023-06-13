"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
// LOAD MODELS FROM DATABASE
var user = _index["default"].user;
var isActive = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var email, userExist;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // GET EMAIL FROM REQUEST BODY
          email = req.body.email; // eslint-disable-next-line no-console
          console.log(email);
          _context.next = 5;
          return user.findOne({
            where: {
              email: email
            }
          });
        case 5:
          userExist = _context.sent;
          if (userExist) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'User does not exist'
          }));
        case 8:
          // Passing the userId in the body for create or getProducts of logged user
          res.locals = {
            email: email
          };
          next();
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function isActive(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = isActive;
exports["default"] = _default;