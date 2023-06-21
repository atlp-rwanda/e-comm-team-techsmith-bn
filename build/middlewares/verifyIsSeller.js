"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _cookies = require("../utils/cookies.js");
var _logger = _interopRequireDefault(require("../controllers/logger.js"));
// LOAD ENVIRONMENT VARIABLES
var secret = process.env.USER_SECRET;
var isSeller = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, _jwt$verify, id, role;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // GET EMAIL FROM REQUEST BODY
          token = (0, _cookies.getToken)(req); // CHECK IF TOKEN IS NOT VALID
          if (token) {
            _context.next = 5;
            break;
          }
          _logger["default"].userLogger.error('/POST statusCode: 401 : Unathorised access, Login required');
          return _context.abrupt("return", res.status(401).json({
            message: 'Unauthorized access. Please login!'
          }));
        case 5:
          // GET USER ID FROM TOKEN
          _jwt$verify = _jsonwebtoken["default"].verify(token, secret), id = _jwt$verify.id, role = _jwt$verify.role; // CHECK IF USER IS NOT A SELLER
          if (!(role !== 2)) {
            _context.next = 9;
            break;
          }
          _logger["default"].userLogger.error('/POST statusCode: 403 : Unathorised user need to access a route');
          return _context.abrupt("return", res.status(403).json({
            message: 'Unauthorized access. Only seller is allowed to perform this action!'
          }));
        case 9:
          // Passing the userId in the body for create or getProducts of logged user
          res.locals = {
            id: id,
            role: role
          };
          next();
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          _logger["default"].userLogger.error("/POST statusCode: 500 : Login failed ".concat(_context.t0.message, " "));
          res.status(500).json({
            message: _context.t0.message
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function isSeller(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = isSeller;
exports["default"] = _default;