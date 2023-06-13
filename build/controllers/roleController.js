"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _excluded = ["password"];
var user = _index["default"].user;
var logger = require('./logger');
var changeRole = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$params, userId, role, userExists, updateRole, _updateRole$dataValue, password, userDetails;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$params = req.params, userId = _req$params.id, role = _req$params.role;
          _context.prev = 1;
          _context.next = 4;
          return user.findOne({
            where: {
              id: userId
            }
          });
        case 4:
          userExists = _context.sent;
          if (userExists) {
            _context.next = 8;
            break;
          }
          logger.userLogger.error('/PUT statusCode: 404 : User not found');
          return _context.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 8:
          _context.next = 10;
          return userExists.update({
            roleId: Number(role)
          });
        case 10:
          updateRole = _context.sent;
          _updateRole$dataValue = updateRole.dataValues, password = _updateRole$dataValue.password, userDetails = (0, _objectWithoutProperties2["default"])(_updateRole$dataValue, _excluded);
          logger.userLogger.error('/PUT statusCode: 200 : User role updated successfully');
          return _context.abrupt("return", res.status(200).json({
            message: 'User updated successfully',
            data: userDetails
          }));
        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](1);
          logger.userLogger.error("/PUT statusCode: 500 : Changing user role failed: ".concat(_context.t0.message));
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message
          }));
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 16]]);
  }));
  return function changeRole(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = changeRole;
exports["default"] = _default;