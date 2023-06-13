"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _emails = require("../utils/emails.js");
var _excluded = ["password", "roleId"],
  _excluded2 = ["password", "roleId"];
_dotenv["default"].config();
var secret = process.env.USER_SECRET;
var logger = require('./logger');
var user = _index["default"].user,
  role = _index["default"].role;
var loginController = /*#__PURE__*/function () {
  function loginController() {
    (0, _classCallCheck2["default"])(this, loginController);
  }
  (0, _createClass2["default"])(loginController, null, [{
    key: "userLogin",
    value: // NORMAL LOGIN
    function () {
      var _userLogin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, userEmail, password, findUser, checkPassword, token, payload, _token, _findUser$dataValues, userPassword, roleId, userDetails;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, userEmail = _req$body.email, password = _req$body.password;
              _context.prev = 1;
              _context.next = 4;
              return user.findOne({
                where: {
                  email: userEmail
                },
                include: {
                  model: role,
                  as: 'role',
                  attributes: ['name']
                }
              });
            case 4:
              findUser = _context.sent;
              if (findUser) {
                _context.next = 8;
                break;
              }
              logger.userLogger.error(' /GET statusCode: 404 : User not found');
              return _context.abrupt("return", res.status(404).json({
                message: 'User not found'
              }));
            case 8:
              _context.next = 10;
              return _bcrypt["default"].compare(password, findUser.password);
            case 10:
              checkPassword = _context.sent;
              if (!(checkPassword && findUser.roleId === 2)) {
                _context.next = 18;
                break;
              }
              token = _jsonwebtoken["default"].sign({
                email: findUser.email
              }, secret, {
                expiresIn: '1h'
              });
              _context.next = 15;
              return (0, _emails.nodeMail)(findUser.email, findUser.name, 'Complete two factor authentication to continue', _emails.twoFAMessageTemplate, token);
            case 15:
              res.cookie('2FA', token, {
                httpOnly: true,
                maxAge: 3600
              });
              logger.userLogger.warn(' /POST 202: Account verification');
              return _context.abrupt("return", res.status(202).json({
                message: 'Please check your email to verify your continue login',
                token: token
              }));
            case 18:
              if (!checkPassword) {
                _context.next = 25;
                break;
              }
              payload = {
                id: findUser.id,
                role: findUser.roleId
              };
              _token = _jsonwebtoken["default"].sign(payload, secret, {
                expiresIn: 604800
              });
              res.cookie('Authorized', _token, {
                httpOnly: true,
                maxAge: 604800,
                path: '/'
              });
              _findUser$dataValues = findUser.dataValues, userPassword = _findUser$dataValues.password, roleId = _findUser$dataValues.roleId, userDetails = (0, _objectWithoutProperties2["default"])(_findUser$dataValues, _excluded);
              logger.userLogger.info(' /POST 200: Successful log in');
              return _context.abrupt("return", res.status(200).json({
                message: 'You have logged in successfully',
                Authorization: _token,
                user: userDetails
              }));
            case 25:
              logger.userLogger.error(' /POST statusCode: 400 : Invalid credentials');
              return _context.abrupt("return", res.status(400).json({
                message: 'Email or password not valid'
              }));
            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](1);
              logger.userLogger.error(" /POST statusCode : 500 : Login failed =>".concat(_context.t0.message));
              return _context.abrupt("return", res.status(500).json({
                message: _context.t0.message
              }));
            case 33:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 29]]);
      }));
      function userLogin(_x, _x2) {
        return _userLogin.apply(this, arguments);
      }
      return userLogin;
    }() // TWO FACTOR AUTHENTICATION
  }, {
    key: "twoFAController",
    value: function () {
      var _twoFAController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var token, _jwt$verify, email, findUser, payload, userToken, _findUser$dataValues2, userPassword, roleId, userDetails;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              token = req.params.token;
              _context2.prev = 1;
              if (token) {
                _context2.next = 5;
                break;
              }
              logger.userLogger.info(' /POST statusCode : 400  Token expired');
              return _context2.abrupt("return", res.status(400).json({
                message: 'Token may have expired. Please login again'
              }));
            case 5:
              _jwt$verify = _jsonwebtoken["default"].verify(token, secret), email = _jwt$verify.email; // CHECK IF USER EXISTS
              _context2.next = 8;
              return user.findOne({
                where: {
                  email: email
                },
                include: {
                  model: role,
                  as: 'role',
                  attributes: ['name']
                }
              });
            case 8:
              findUser = _context2.sent;
              payload = {
                id: findUser.id,
                role: findUser.roleId
              }; // GENERATE TOKEN
              userToken = _jsonwebtoken["default"].sign(payload, secret, {
                expiresIn: 604800
              }); // SET COOKIE
              res.cookie('Authorized', userToken, {
                httpOnly: true,
                maxAge: 604800
              });
              _findUser$dataValues2 = findUser.dataValues, userPassword = _findUser$dataValues2.password, roleId = _findUser$dataValues2.roleId, userDetails = (0, _objectWithoutProperties2["default"])(_findUser$dataValues2, _excluded2); // RETURN USER DETAILS
              logger.userLogger.info(' /GET statusCode: 200 : log in successfully');
              return _context2.abrupt("return", res.status(200).json({
                message: 'Login successfully',
                Authorization: userToken,
                user: userDetails
              }));
            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](1);
              logger.userLogger.error(" statuCode: 500 : 2FA failed -".concat(_context2.t0.message));
              return _context2.abrupt("return", res.status(500).json({
                message: _context2.t0.message
              }));
            case 21:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 17]]);
      }));
      function twoFAController(_x3, _x4) {
        return _twoFAController.apply(this, arguments);
      }
      return twoFAController;
    }()
  }]);
  return loginController;
}();
var _default = loginController;
exports["default"] = _default;