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
var _index = _interopRequireDefault(require("../../database/models/index.js"));
// IMPORT NOTIFICATION MODEL
var notification = _index["default"].notification;
var Notification = /*#__PURE__*/function () {
  function Notification() {
    (0, _classCallCheck2["default"])(this, Notification);
  }
  (0, _createClass2["default"])(Notification, null, [{
    key: "createNotification",
    value: // CREATE NOTIFICATION
    function () {
      var _createNotification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userId, title, body) {
        var newNotification;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return notification.create({
                userId: userId,
                title: title,
                body: body
              });
            case 3:
              newNotification = _context.sent;
              return _context.abrupt("return", newNotification);
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", _context.t0);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 7]]);
      }));
      function createNotification(_x, _x2, _x3) {
        return _createNotification.apply(this, arguments);
      }
      return createNotification;
    }() // READ SINGLE NOTIFICATION
  }, {
    key: "readSingleNotification",
    value: function () {
      var _readSingleNotification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, userId, singleNotification, readNotification;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id; // CATCH USER ID FROM LOCAL RESPONSES
              userId = res.locals.id;
              _context2.next = 5;
              return notification.findOne({
                where: {
                  id: id,
                  userId: userId
                }
              });
            case 5:
              singleNotification = _context2.sent;
              if (singleNotification) {
                _context2.next = 8;
                break;
              }
              return _context2.abrupt("return", res.status(404).json({
                error: 'Notification not found'
              }));
            case 8:
              _context2.next = 10;
              return notification.update({
                status: 1
              }, {
                where: {
                  id: id
                },
                returning: true,
                plain: true
              });
            case 10:
              readNotification = _context2.sent;
              return _context2.abrupt("return", res.status(200).json({
                message: 'Notification read successfully',
                data: readNotification
              }));
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", res.status(500).json({
                error: _context2.t0.message
              }));
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 14]]);
      }));
      function readSingleNotification(_x4, _x5) {
        return _readSingleNotification.apply(this, arguments);
      }
      return readSingleNotification;
    }() // READ ALL NOTIFICATIONS
  }, {
    key: "readAllNotifications",
    value: function () {
      var _readAllNotifications = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var id, updatedNotifications;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              id = res.locals.id;
              _context3.prev = 1;
              _context3.next = 4;
              return notification.update({
                status: 1
              }, {
                where: {
                  userId: id
                },
                returning: true,
                plain: true
              });
            case 4:
              updatedNotifications = _context3.sent;
              return _context3.abrupt("return", res.status(200).json({
                message: 'Notifications read successfully',
                data: updatedNotifications
              }));
            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](1);
              return _context3.abrupt("return", res.status(500).json({
                message: _context3.t0
              }));
            case 11:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 8]]);
      }));
      function readAllNotifications(_x6, _x7) {
        return _readAllNotifications.apply(this, arguments);
      }
      return readAllNotifications;
    }() // GET ALL UNREAD NOTIFICATIONS
  }, {
    key: "getUnreadNotifications",
    value: function () {
      var _getUnreadNotifications = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, unreadNotifications;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              id = res.locals.id;
              _context4.prev = 1;
              _context4.next = 4;
              return notification.findAll({
                where: {
                  userId: id,
                  status: 0
                }
              });
            case 4:
              unreadNotifications = _context4.sent;
              if (!(unreadNotifications.length < 1)) {
                _context4.next = 7;
                break;
              }
              return _context4.abrupt("return", res.status(200).json({
                message: 'You are all caught up'
              }));
            case 7:
              return _context4.abrupt("return", res.status(200).json({
                message: 'Notifications retrieved successfully',
                data: unreadNotifications
              }));
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](1);
              return _context4.abrupt("return", res.status(500).json({
                error: _context4.t0.message
              }));
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[1, 10]]);
      }));
      function getUnreadNotifications(_x8, _x9) {
        return _getUnreadNotifications.apply(this, arguments);
      }
      return getUnreadNotifications;
    }() // DELETE NOTIFICATION
  }, {
    key: "deleteSingleNotification",
    value: function () {
      var _deleteSingleNotification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, userId, singleNotification, deletedNotification;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              id = req.params.id; // CATCH USER ID FROM LOCAL RESPONSES
              userId = res.locals.id;
              _context5.next = 5;
              return notification.findOne({
                where: {
                  id: id,
                  userId: userId
                }
              });
            case 5:
              singleNotification = _context5.sent;
              if (singleNotification) {
                _context5.next = 8;
                break;
              }
              return _context5.abrupt("return", res.status(404).json({
                message: 'Notification not found'
              }));
            case 8:
              _context5.next = 10;
              return notification.destroy({
                where: {
                  id: id
                }
              });
            case 10:
              deletedNotification = _context5.sent;
              return _context5.abrupt("return", res.status(200).json({
                message: 'Notification deleted',
                data: deletedNotification
              }));
            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", res.status(500).json({
                error: _context5.t0.message
              }));
            case 17:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 14]]);
      }));
      function deleteSingleNotification(_x10, _x11) {
        return _deleteSingleNotification.apply(this, arguments);
      }
      return deleteSingleNotification;
    }() // GET ALL NOTIFICATIONS
  }, {
    key: "getAllNotifications",
    value: function () {
      var _getAllNotifications = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var id, allNotifications;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              id = res.locals.id;
              _context6.prev = 1;
              _context6.next = 4;
              return notification.findAll({
                where: {
                  userId: id
                }
              });
            case 4:
              allNotifications = _context6.sent;
              if (!(allNotifications.length < 1)) {
                _context6.next = 7;
                break;
              }
              return _context6.abrupt("return", res.status(200).json({
                message: 'You are all caught up'
              }));
            case 7:
              return _context6.abrupt("return", res.status(200).json({
                message: 'Notifications retrieved successfully',
                data: allNotifications
              }));
            case 10:
              _context6.prev = 10;
              _context6.t0 = _context6["catch"](1);
              return _context6.abrupt("return", res.status(500).json({
                error: _context6.t0.message
              }));
            case 13:
            case "end":
              return _context6.stop();
          }
        }, _callee6, null, [[1, 10]]);
      }));
      function getAllNotifications(_x12, _x13) {
        return _getAllNotifications.apply(this, arguments);
      }
      return getAllNotifications;
    }()
  }]);
  return Notification;
}();
var _default = Notification;
exports["default"] = _default;