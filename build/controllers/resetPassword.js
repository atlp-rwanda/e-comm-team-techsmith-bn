"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processReset = processReset;
exports.requestReset = requestReset;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _models = require("../../database/models");
var logger = require('./logger');
_dotenv["default"].config();

// Define the nodemailer transporter object
var transporter = _nodemailer["default"].createTransport({
  service: process.env.RESET_EMAIL_SERVICE,
  auth: {
    user: process.env.RESET_EMAIL,
    pass: process.env.RESET_PASSWORD
  }
});
// Send the password reset email
function sendResetEmail(_x) {
  return _sendResetEmail.apply(this, arguments);
}
function _sendResetEmail() {
  _sendResetEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var token, newToken, resetLink, mailOptions;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = _jsonwebtoken["default"].sign({
            email: user.email
          }, process.env.USER_SECRET, {
            expiresIn: '1h'
          });
          newToken = token.replace(/\./g, '-');
          resetLink = "".concat(process.env.HOST, "/reset-password/").concat(newToken);
          mailOptions = {
            to: user.email,
            from: "ATLP E-commerce <".concat(process.env.RESET_EMAIL, ">"),
            subject: 'Your App Password Reset',
            text: "Hi ".concat(user.name, ",\n\nYou are receiving this email because we received a password reset request for your account.\n    \n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n").concat(resetLink, "\n If\n     you did not request this, please ignore this email and your password will remain unchanged.\n")
          };
          _context.next = 6;
          return transporter.sendMail(mailOptions);
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _sendResetEmail.apply(this, arguments);
}
function verifyResetToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken["default"].verify(token, process.env.USER_SECRET, function (err, decoded) {
      if (err) {
        reject(err);
      } else {
        resolve(decoded.email);
      }
    });
  });
}
function resetPassword(_x2, _x3) {
  return _resetPassword.apply(this, arguments);
}
function _resetPassword() {
  _resetPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, password) {
    var hashedPassword, foundUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _bcrypt["default"].hash(password, 10);
        case 2:
          hashedPassword = _context2.sent;
          _context2.next = 5;
          return _models.user.findOne({
            where: {
              email: email
            }
          });
        case 5:
          foundUser = _context2.sent;
          _context2.next = 8;
          return foundUser.update({
            password: hashedPassword,
            passcodeModifiedAt: Date.now()
          });
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _resetPassword.apply(this, arguments);
}
function requestReset(_x4, _x5) {
  return _requestReset.apply(this, arguments);
}
function _requestReset() {
  _requestReset = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var email, foundUser, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          _context3.next = 3;
          return _models.user.findOne({
            where: {
              email: email
            }
          });
        case 3:
          foundUser = _context3.sent;
          if (foundUser) {
            _context3.next = 7;
            break;
          }
          logger.userLogger.error('/PUT statusCode: 404 : Email TO RESET password not found');
          return _context3.abrupt("return", res.status(404).json({
            message: 'Email not found'
          }));
        case 7:
          token = _jsonwebtoken["default"].sign({
            email: email
          }, process.env.USER_SECRET, {
            expiresIn: '1h'
          });
          res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600,
            path: '/'
          });
          _context3.next = 11;
          return foundUser.save();
        case 11:
          _context3.next = 13;
          return sendResetEmail(foundUser);
        case 13:
          logger.userLogger.error('/PUT statusCode: 200 : Password reset email sent');
          return _context3.abrupt("return", res.status(200).json({
            message: 'Password reset email sent'
          }));
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _requestReset.apply(this, arguments);
}
function processReset(_x6, _x7) {
  return _processReset.apply(this, arguments);
}
function _processReset() {
  _processReset = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var token, password, email, foundUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          token = req.params.token;
          password = req.body.password;
          _context4.prev = 2;
          _context4.next = 5;
          return verifyResetToken(token);
        case 5:
          email = _context4.sent;
          _context4.next = 8;
          return _models.user.findOne({
            where: {
              email: email
            }
          });
        case 8:
          foundUser = _context4.sent;
          if (foundUser) {
            _context4.next = 12;
            break;
          }
          logger.userLogger.error('/PUT statusCode: 404 : Email to reset password not found');
          return _context4.abrupt("return", res.status(404).json({
            error: req.t('error')
          }));
        case 12:
          _context4.next = 14;
          return resetPassword(email, password);
        case 14:
          logger.userLogger.info('/PUT statusCode: 200 : Password reset completed successfully');
          return _context4.abrupt("return", res.status(200).json({
            ok: true,
            message: 'Password reset successfully'
          }));
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](2);
          logger.userLogger.error('/PUT statusCode: 400 : Invalid token provided');
          return _context4.abrupt("return", res.status(400).json({
            message: 'Invalid token'
          }));
        case 22:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 18]]);
  }));
  return _processReset.apply(this, arguments);
}