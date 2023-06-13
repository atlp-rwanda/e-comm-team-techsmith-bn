"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cookies = require("../utils/cookies");
_dotenv["default"].config();
var logger = require('../controllers/logger');
// verify if the user is the admin using the token in cookies
var isAdmin = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$headers, cookie, authorization, token, _jwt$verify, id, role;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$headers = req.headers, cookie = _req$headers.cookie, authorization = _req$headers.authorization; // IF NO COOKIE IS FOUND
          if (!(!cookie && !authorization)) {
            _context.next = 5;
            break;
          }
          logger.userLogger.error('/POST statusCode: 401 : Unauthorized access, Login required');
          return _context.abrupt("return", res.status(401).send({
            message: 'Please log in to perform this action'
          }));
        case 5:
          // EXTRACT TOKEN FROM COOKIE
          token = (0, _cookies.getToken)(req); // IF NO TOKEN IS FOUND
          if (token) {
            _context.next = 9;
            break;
          }
          logger.userLogger.error('/POST statusCode: 401 : Unauthorized access, token required');
          return _context.abrupt("return", res.status(400).send({
            message: 'Could not verify your authentication'
          }));
        case 9:
          // VERIFY TOKEN
          _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.USER_SECRET), id = _jwt$verify.id, role = _jwt$verify.role; // IF USER IS NOT ADMIN
          if (!(role !== 1)) {
            _context.next = 13;
            break;
          }
          logger.userLogger.warn('/POST statusCode: 403 : Forbidden access,Only admin is allowed to perform the action');
          return _context.abrupt("return", res.status(403).send({
            message: 'Unauthorized! Only site admin is allowed to perform this action.'
          }));
        case 13:
          // RETURN USER ID AND ROLE
          res.locals = {
            id: id,
            role: role
          };
          // PROCEED IF USER IS ADMIN
          next();
          _context.next = 21;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          logger.userLogger.error("/POST statusCode: 500 : verifyIsBuyer failed ".concat(_context.t0.message));
          next();
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function isAdmin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var _default = isAdmin;
exports["default"] = _default;