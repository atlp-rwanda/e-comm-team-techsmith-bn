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
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _cookies = require("../utils/cookies.js");
var _excluded = ["password"],
  _excluded2 = ["password"];
// CONFIG DOTENV
_dotenv["default"].config();

// LOAD MODELS FROM DATABASE
var user = _index["default"].user;

/* USER CONTROLLER */
var userController = /*#__PURE__*/function () {
  function userController() {
    (0, _classCallCheck2["default"])(this, userController);
  }
  (0, _createClass2["default"])(userController, null, [{
    key: "getUser",
    value: //  Getting a user by id
    function () {
      var _getUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var id, userInfo, userPassword, userDeatils;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              id = req.params.id;
              _context.next = 4;
              return user.findOne({
                where: {
                  id: id
                }
              });
            case 4:
              userInfo = _context.sent;
              if (userInfo) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", res.status(404).json({
                message: 'User not found'
              }));
            case 7:
              // FILTER PASSWORD FROM USER RESPONSE
              userPassword = userInfo.password, userDeatils = (0, _objectWithoutProperties2["default"])(userInfo, _excluded); // RETURN SUCCESS MESSAGE
              return _context.abrupt("return", res.status(200).json({
                ok: true,
                data: userDeatils
              }));
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(500).json({
                ok: false,
                message: _context.t0.message
              }));
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 11]]);
      }));
      function getUser(_x, _x2) {
        return _getUser.apply(this, arguments);
      }
      return getUser;
    }() // Update User
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, findUser, _req$body, name, email, gender, birthDate, preferredLanguage, preferredCurrency, physicalAddress, checkUpdate, _checkUpdate$1$, userPassword, userDetails;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = res.locals.id;
              if (!(id !== Number(req.params.id))) {
                _context2.next = 4;
                break;
              }
              return _context2.abrupt("return", res.status(401).json({
                message: 'You are only allowed to interact with your profile'
              }));
            case 4:
              if (!id) {
                _context2.next = 19;
                break;
              }
              _context2.next = 7;
              return user.findOne({
                where: {
                  id: id
                }
              });
            case 7:
              findUser = _context2.sent;
              if (!findUser) {
                _context2.next = 19;
                break;
              }
              _req$body = req.body, name = _req$body.name, email = _req$body.email, gender = _req$body.gender, birthDate = _req$body.birthDate, preferredLanguage = _req$body.preferredLanguage, preferredCurrency = _req$body.preferredCurrency, physicalAddress = _req$body.physicalAddress;
              if (!email) {
                _context2.next = 12;
                break;
              }
              return _context2.abrupt("return", res.status(403).json({
                message: 'You are not authorized to update your email'
              }));
            case 12:
              _context2.next = 14;
              return user.update({
                name: name,
                gender: gender,
                birthDate: birthDate,
                preferredLanguage: preferredLanguage,
                preferredCurrency: preferredCurrency,
                physicalAddress: physicalAddress
              }, {
                where: {
                  id: id
                },
                returning: true,
                "new": true
              });
            case 14:
              checkUpdate = _context2.sent;
              _checkUpdate$1$ = checkUpdate[1][0], userPassword = _checkUpdate$1$.password, userDetails = (0, _objectWithoutProperties2["default"])(_checkUpdate$1$, _excluded2);
              if (!checkUpdate) {
                _context2.next = 18;
                break;
              }
              return _context2.abrupt("return", res.status(200).json({
                ok: true,
                message: 'Updated successfully',
                updatedUser: userDetails
              }));
            case 18:
              return _context2.abrupt("return", res.status(400).json({
                ok: false,
                message: 'Sorry, Update failed!',
                updatedUser: checkUpdate
              }));
            case 19:
              _context2.next = 24;
              break;
            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", _context2.t0.message);
            case 24:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 21]]);
      }));
      function updateUser(_x3, _x4) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }() //   Update user password
  }, {
    key: "updatePass",
    value: function () {
      var _updatePass = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _req$body2, email, oldPassword, newPassword, confPassword, foundUser, checkPassword, hashNewPassword;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$body2 = req.body, email = _req$body2.email, oldPassword = _req$body2.oldPassword, newPassword = _req$body2.newPassword, confPassword = _req$body2.confPassword; // Checking if the email value provided is found in the database
              _context3.next = 4;
              return user.findOne({
                where: {
                  email: email
                }
              });
            case 4:
              foundUser = _context3.sent;
              if (!foundUser) {
                _context3.next = 19;
                break;
              }
              _context3.next = 8;
              return _bcrypt["default"].compare(oldPassword, foundUser.password);
            case 8:
              checkPassword = _context3.sent;
              if (!checkPassword) {
                _context3.next = 18;
                break;
              }
              if (!(newPassword === confPassword)) {
                _context3.next = 17;
                break;
              }
              _context3.next = 13;
              return _bcrypt["default"].hash(newPassword, 10);
            case 13:
              hashNewPassword = _context3.sent;
              _context3.next = 16;
              return user.update({
                password: hashNewPassword
              }, {
                where: {
                  email: email
                }
              });
            case 16:
              return _context3.abrupt("return", res.status(200).json({
                message: 'Password updated succesfully'
              }));
            case 17:
              return _context3.abrupt("return", res.status(401).json({
                message: 'Password do not match'
              }));
            case 18:
              return _context3.abrupt("return", res.status(401).json({
                message: 'Provide the correct password in the old password field'
              }));
            case 19:
              return _context3.abrupt("return", res.status(404).json({
                message: 'User does not exists or make sure you are logged in'
              }));
            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", res.status(500).json(_context3.t0.message));
            case 25:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 22]]);
      }));
      function updatePass(_x5, _x6) {
        return _updatePass.apply(this, arguments);
      }
      return updatePass;
    }()
  }]);
  return userController;
}();
// LOGOUT
(0, _defineProperty2["default"])(userController, "logoutController", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var cookie;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          cookie = (0, _cookies.getCookie)(req);
          /* eslint-disable */
          console.log(req.headers, cookie);
          _context4.prev = 2;
          if (cookie) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", res.status(401).json({
            success: false,
            message: 'You are not logged in'
          }));
        case 5:
          res.clearCookie(cookie);
          res.status(200).json({
            success: true,
            message: 'Logout successful'
          });
          _context4.next = 12;
          break;
        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](2);
          return _context4.abrupt("return", res.status(500).json({
            message: _context4.t0.message
          }));
        case 12:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 9]]);
  }));
  return function (_x7, _x8) {
    return _ref.apply(this, arguments);
  };
}());
var _default = userController;
exports["default"] = _default;