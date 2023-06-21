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
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _emails = require("../utils/emails.js");
var _userValidation = require("../utils/userValidation.js");
var subscription = _index["default"].subscription;
var newsletterSubscribe = /*#__PURE__*/function () {
  function newsletterSubscribe() {
    (0, _classCallCheck2["default"])(this, newsletterSubscribe);
  }
  (0, _createClass2["default"])(newsletterSubscribe, null, [{
    key: "requestSubscription",
    value: // REQUEST SUBSCRIPTION
    function () {
      var _requestSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, username, userEmail, validEmail, subscriptionExists, requestSubscribe, token;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, username = _req$body.name, userEmail = _req$body.email;
              _context.prev = 1;
              // VALIDATE EMAIL
              validEmail = (0, _userValidation.validateEmail)(userEmail);
              if (validEmail) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return", res.status(400).json({
                message: 'Invalid email'
              }));
            case 5:
              _context.next = 7;
              return subscription.findOne({
                where: {
                  email: userEmail
                }
              });
            case 7:
              subscriptionExists = _context.sent;
              if (!(subscriptionExists !== null && subscriptionExists !== void 0 && subscriptionExists.isSubscribed)) {
                _context.next = 10;
                break;
              }
              return _context.abrupt("return", res.status(409).json({
                message: 'Your email is already subscribed to our newsletter'
              }));
            case 10:
              _context.next = 12;
              return subscription.create({
                name: username,
                email: userEmail,
                isSubscribed: false,
                createdAt: new Date(),
                updatedAt: new Date()
              });
            case 12:
              requestSubscribe = _context.sent;
              // GENERATE TOKEN
              token = _jsonwebtoken["default"].sign({
                userEmail: userEmail
              }, process.env.USER_SECRET, {
                expiresIn: '1d'
              });
              _context.next = 16;
              return (0, _emails.nodeMail)(userEmail, username, "Welcome to the Newsletter, ".concat(username), _emails.newsletterSubscriptionMessageTemplate, token);
            case 16:
              return _context.abrupt("return", res.status(201).json({
                message: 'You have successfully requested to subscribe to our newsletter',
                token: token,
                data: requestSubscribe
              }));
            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", res.status(500).json({
                message: _context.t0.message
              }));
            case 22:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 19]]);
      }));
      function requestSubscription(_x, _x2) {
        return _requestSubscription.apply(this, arguments);
      }
      return requestSubscription;
    }() // CONFIRM SUBSCRIPTION
  }, {
    key: "confirmSubscription",
    value: function () {
      var _confirmSubscription = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var token, _jwt$verify, userEmail, user, updatedUser;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // CATCH TOKEN PASSED IN PATH
              token = req.params.token;
              _context2.prev = 1;
              // VERIFY TOKEN
              _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.USER_SECRET), userEmail = _jwt$verify.userEmail; // FIND USER
              _context2.next = 5;
              return subscription.findOne({
                where: {
                  email: userEmail
                }
              });
            case 5:
              user = _context2.sent;
              if (!user.isSubscribed) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("return", res.status(409).send({
                message: 'You have already confirmed your subscription to our newsletter. Enjoy the ride'
              }));
            case 8:
              _context2.next = 10;
              return user.update({
                isSubscribed: true
              });
            case 10:
              updatedUser = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                ok: true,
                message: 'You have successfully subscribed to our newsletter',
                data: updatedUser
              }));
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](1);
              return _context2.abrupt("return", res.status(500).json({
                message: _context2.t0.message
              }));
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[1, 14]]);
      }));
      function confirmSubscription(_x3, _x4) {
        return _confirmSubscription.apply(this, arguments);
      }
      return confirmSubscription;
    }()
  }]);
  return newsletterSubscribe;
}();
var _default = newsletterSubscribe;
exports["default"] = _default;