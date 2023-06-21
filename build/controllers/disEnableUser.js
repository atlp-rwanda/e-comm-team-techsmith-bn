"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _models = _interopRequireDefault(require("../../database/models"));
var User = _models["default"].user;
var logger = require('./logger');
var dis_enableController = /*#__PURE__*/function () {
  function dis_enableController() {
    (0, _classCallCheck2["default"])(this, dis_enableController);
  }
  (0, _createClass2["default"])(dis_enableController, null, [{
    key: "disableUser",
    value: function () {
      var _disableUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref, res) {
        var params, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              params = _ref.params;
              _context.prev = 1;
              _context.next = 4;
              return User.findOne({
                where: {
                  id: params.id
                }
              });
            case 4:
              user = _context.sent;
              if (user) {
                _context.next = 8;
                break;
              }
              logger.userLogger.error(' /PUT statusCode: 404 : Account to be disabled not found ');
              return _context.abrupt("return", res.status(404).json({
                error: 'Account to be disabled not found!'
              }));
            case 8:
              _context.next = 10;
              return User.update({
                isActive: false
              }, {
                where: {
                  id: params.id
                },
                returning: true,
                plain: true
              });
            case 10:
              logger.userLogger.info(' /PUT statusCode: 200 : Account disabled successfully ');
              return _context.abrupt("return", res.status(200).json({
                message: "Account was successfully disabled"
              }));
            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](1);
              logger.userLogger.error(" /PUT statusCode: 500 :Disabling account failed : ".concat(_context.t0.message));
              return _context.abrupt("return", res.status(500).json({
                error: _context.t0.message
              }));
            case 18:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 14]]);
      }));
      function disableUser(_x, _x2) {
        return _disableUser.apply(this, arguments);
      }
      return disableUser;
    }()
  }, {
    key: "enableUser",
    value: function () {
      var _enableUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2, res) {
        var params, user, enabledUser;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              params = _ref2.params;
              _context2.prev = 1;
              _context2.next = 4;
              return User.findOne({
                where: {
                  id: params.id
                }
              });
            case 4:
              user = _context2.sent;
              if (user) {
                _context2.next = 8;
                break;
              }
              logger.userLogger.error(' /PUT statusCode: 404 : Account to be anabled not found ');
              return _context2.abrupt("return", res.status(404).json({
                error: 'Account to be enabled not found!'
              }));
            case 8:
              _context2.next = 10;
              return User.update({
                isActive: true
              }, {
                where: {
                  id: params.id
                },
                returning: true,
                attributes: {
                  exclude: ['password']
                }
              });
            case 10:
              enabledUser = _context2.sent;
              logger.userLogger.info(' /PUT statusCode: 200 : Account enabled successfully ');
              return _context2.abrupt("return", res.status(200).json({
                message: "Account which belongs to ".concat(user.name, " was successfully enabled"),
                enabledUser: enabledUser
              }));
            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](1);
              logger.userLogger.error(" /PUT statusCode: 500 :Enabling account failed : ".concat(_context2.t0.message));
              return _context2.abrupt("return", res.status(500).json({
                error: _context2.t0.message
              }));
            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 15]]);
      }));
      function enableUser(_x3, _x4) {
        return _enableUser.apply(this, arguments);
      }
      return enableUser;
    }()
  }]);
  return dis_enableController;
}();
var _default = dis_enableController;
exports["default"] = _default;