"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeTestMessages = exports.removeActiveUser = exports.getMessages = exports.getActiveUsers = exports.createMessage = exports.addActiveUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _moment = _interopRequireDefault(require("moment"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
// CONFIGURE MOMENT
(0, _moment["default"])().format();

// LOAD MODELS FROM DB
var chat = _index["default"].chat,
  user = _index["default"].user,
  activity = _index["default"].activity;
var createMessage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(message) {
    var loggedInUser, messageBody, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // GET MESSAGE DETAILS
          loggedInUser = message.loggedInUser, messageBody = message.message; // DEFINE RESPONSE
          response = {}; // CREATE MESSAGE
          _context.next = 5;
          return chat.create({
            messageBody: messageBody,
            userId: loggedInUser.id
          }).then(function (messageResponse) {
            var _messageResponse$data = messageResponse.dataValues,
              body = _messageResponse$data.messageBody,
              createdAt = _messageResponse$data.createdAt,
              updatedAt = _messageResponse$data.updatedAt;
            response = {
              user: {
                id: loggedInUser.id,
                name: loggedInUser.name,
                email: loggedInUser.email
              },
              messageBody: body,
              createdAt: (0, _moment["default"])(createdAt).format('MMM D, h:mm A'),
              updatedAt: (0, _moment["default"])(updatedAt).format('MMM D, h:mm A')
            };
            return response;
          });
        case 5:
          return _context.abrupt("return", response);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          // eslint-disable-next-line
          console.log(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function createMessage(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.createMessage = createMessage;
var getMessages = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var messages, returnMessages;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return chat.findAll({
            order: [['createdAt', 'ASC']],
            attributes: ['id', 'messageBody', 'createdAt', 'updatedAt'],
            include: [{
              model: user,
              as: 'user',
              attributes: ['id', 'name', 'email']
            }]
          });
        case 3:
          messages = _context2.sent;
          returnMessages = messages.map(function (message) {
            var _message$dataValues = message.dataValues,
              id = _message$dataValues.id,
              messageBody = _message$dataValues.messageBody,
              createdAt = _message$dataValues.createdAt,
              updatedAt = _message$dataValues.updatedAt,
              _message$dataValues$u = _message$dataValues.user,
              userId = _message$dataValues$u.id,
              name = _message$dataValues$u.name,
              email = _message$dataValues$u.email;
            return {
              id: id,
              messageBody: messageBody,
              createdAt: (0, _moment["default"])(createdAt).format('MMM D, h:mm A'),
              updatedAt: (0, _moment["default"])(updatedAt).format('MMM D, h:mm A'),
              user: {
                id: userId,
                name: name,
                email: email
              }
            };
          });
          return _context2.abrupt("return", returnMessages);
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", _context2.t0);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function getMessages() {
    return _ref2.apply(this, arguments);
  };
}();
exports.getMessages = getMessages;
var getActiveUsers = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var activeUsers, returnUsers;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return activity.findAll({
            attributes: ['id', 'room'],
            include: {
              model: user,
              as: 'user',
              attributes: ['id', 'name', 'email']
            }
          });
        case 3:
          activeUsers = _context3.sent;
          returnUsers = activeUsers.map(function (activeUser) {
            var _activeUser$dataValue = activeUser.dataValues,
              id = _activeUser$dataValue.id,
              room = _activeUser$dataValue.room,
              _activeUser$dataValue2 = _activeUser$dataValue.user,
              userId = _activeUser$dataValue2.id,
              name = _activeUser$dataValue2.name,
              email = _activeUser$dataValue2.email;
            return {
              id: id,
              room: room,
              user: {
                id: userId,
                name: name,
                email: email
              }
            };
          });
          return _context3.abrupt("return", returnUsers);
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", _context3.t0);
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function getActiveUsers() {
    return _ref3.apply(this, arguments);
  };
}();
exports.getActiveUsers = getActiveUsers;
var removeActiveUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userDisconnected) {
    var deleteUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return activity.destroy({
            where: {
              userId: userDisconnected.id
            },
            returning: true
          });
        case 3:
          deleteUser = _context4.sent;
          return _context4.abrupt("return", deleteUser);
        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", _context4.t0);
        case 10:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function removeActiveUser(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
exports.removeActiveUser = removeActiveUser;
var addActiveUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(loggedInUser) {
    var id, name, email, userExists, _returnUser, returnUser;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = loggedInUser.id, name = loggedInUser.name, email = loggedInUser.email;
          _context5.next = 4;
          return activity.findOne({
            where: {
              userId: id
            }
          });
        case 4:
          userExists = _context5.sent;
          if (userExists) {
            _context5.next = 10;
            break;
          }
          _context5.next = 8;
          return activity.create({
            userId: id
          });
        case 8:
          _returnUser = {
            id: id,
            room: 'Techsmiths',
            user: {
              id: id,
              name: name,
              email: email
            }
          };
          return _context5.abrupt("return", _returnUser);
        case 10:
          returnUser = {
            id: userExists.id,
            room: userExists.room,
            user: {
              id: id,
              name: name,
              email: email
            }
          };
          return _context5.abrupt("return", returnUser);
        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", _context5.t0);
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 14]]);
  }));
  return function addActiveUser(_x3) {
    return _ref5.apply(this, arguments);
  };
}();
exports.addActiveUser = addActiveUser;
var removeTestMessages = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userId) {
    var response;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return chat.destroy({
            where: {
              userId: userId
            }
          });
        case 3:
          response = _context6.sent;
          return _context6.abrupt("return", response);
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", _context6.t0);
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function removeTestMessages(_x4) {
    return _ref6.apply(this, arguments);
  };
}();
exports.removeTestMessages = removeTestMessages;