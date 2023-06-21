"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireDefault(require("chai"));
var _chatroomController = require("../controllers/chatroomController");
// MESSAGE CONTENT
var message = {
  loggedInUser: {
    id: 115,
    name: 'Nishimwe 2FA',
    email: 'atlpseller@gmail.com',
    image: 'https://res.cloudinary.com/nishimweprince/image/upload/v1681665357/ecommerce/chatbox/kyjaoshy265u2pcksyda.png'
  },
  message: 'This is a test message'
};
describe('Chatroom Controller', function () {
  // GET ALL MESSAGES
  describe('Get all messages', function () {
    it('should return all messages', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var messages;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _chatroomController.getMessages)();
          case 2:
            messages = _context.sent;
            _chai["default"].expect(messages).to.be.an('array');
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    })));
  });
  // GET ACTIVE USERS
  describe('Get active users', function () {
    it('should return all active users', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var users;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _chatroomController.getActiveUsers)();
          case 2:
            users = _context2.sent;
            _chai["default"].expect(users).to.be.an('array');
          case 4:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    })));
  });
  // CREATE MESSAGE
  describe('Create message', function () {
    it('should create a new message', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var newMessage;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _chatroomController.createMessage)(message);
          case 2:
            newMessage = _context3.sent;
            _chai["default"].expect(newMessage).to.be.an('object');
          case 4:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    })));
  });
  // ADD ACTIVE USER
  var user = {};
  describe('Add active user', function () {
    it('should add active user', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _chatroomController.addActiveUser)(message.loggedInUser);
          case 2:
            user = _context4.sent;
            _chai["default"].expect(user).to.be.an('object');
          case 4:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })));
  });
  // REMOVE ACTIVE USER
  describe('Get remaining users', function () {
    it('should return remaining users', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      var response;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _chatroomController.removeActiveUser)(user);
          case 2:
            response = _context5.sent;
            _chai["default"].expect(response).to.be.an('number');
          case 4:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    })));
  });
  // CLEAN UP
  describe('Remove test messages', function () {
    it('should remove test messages', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var response;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _chatroomController.removeTestMessages)(message.loggedInUser.id);
          case 2:
            response = _context6.sent;
            _chai["default"].expect(response).to.be.an('number');
          case 4:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    })));
  });
});