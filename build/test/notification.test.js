"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _chai = _interopRequireWildcard(require("chai"));
var _server = _interopRequireDefault(require("../server.js"));
var _notificationController = _interopRequireDefault(require("../controllers/notificationController"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// SELLER CREDENTIALS
var seller = {
  email: 'atlpseller@gmail.com',
  password: 'Password@00'
};

/**
 * MUTABLE VARIABLES
 */
// TOKEN
var token = '',
  // NOTIFICATION ID
  notificationId = '';
// AUTHENTICATION VARIABLES
var sellerCookie = '',
  otherCookie = '';

// NOTIFICATION TEST VARIABLES
var createNotification = {
  userId: 115,
  title: 'Test notification',
  body: 'This is a test notification'
};

// CREATE LOGIN TEST
describe('Seller login', function () {
  // PROCEED TO 2FA
  describe('Seller initial login', function () {
    it('should return a partial success code 202 ahead of two facto authentication', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(seller).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(202);
        token = res.body.token;
        done();
      });
    });
  });
  // COMPLETE TWO FACTOR AUTHENTICATION
  describe('Seller two factor authentication', function () {
    it('should return a success code 200 after successful authentication', function (done) {
      _chai["default"].request(_server["default"]).get("/api/users/login/".concat(token)).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        sellerCookie = res.header['set-cookie'][0];
        done();
      });
    });
  });
});

/**
 * NOTIFICATION TESTS
 */

describe('Notification Controller', function () {
  // GET ALL NOTIFICATIONS
  describe('Get all notifications', function () {
    it('Should return all notifications and success code 200', function (done) {
      _chai["default"].request(_server["default"]).get('/api/notify').set('cookie', sellerCookie).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        done();
      });
    });
  });
  // GET UNREAD NOTIFICATIONS
  describe('Get unread notifications', function () {
    it('Should return unread notifications and success code 200', function (done) {
      _chai["default"].request(_server["default"]).get('/api/notify/unread').set('cookie', sellerCookie).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        done();
      });
    });
  });
  // READ ALL NOTIFICATIONS
  describe('Read all notifications', function () {
    it('Should return all notifications and success code 200', function (done) {
      _chai["default"].request(_server["default"]).get('/api/notify/read').set('cookie', sellerCookie).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        done();
      });
    });
  });
  // CREATE NOTIFICATION
  describe('Create notification', function () {
    // IF PROVIDED DATA IS VALID
    describe('Given the provided data is valid', function () {
      it('Should return an object with dataValues property', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var res, newNotification;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              res = '';
              _context.next = 3;
              return _notificationController["default"].createNotification(createNotification.userId, createNotification.title, createNotification.body, res);
            case 3:
              newNotification = _context.sent;
              notificationId = newNotification.dataValues.id;
              _chai["default"].expect(newNotification).to.have.property('dataValues');
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })));
    });
    // IF PROVIDED DATA IS INVALID
    describe('Given the provided data is invalid', function () {
      it('Should return an error', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var res, response;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _notificationController["default"].createNotification('Invalid data', 'Invalid data', 'Invalid status', res);
            case 2:
              response = _context2.sent;
              _chai["default"].expect(response).to.not.have.property('dataValues');
            case 4:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      })));
    });
  });
  // READ SINGLE NOTIFICATION
  describe('Read single notification', function () {
    // IF NOTIFICATION DOES NOT EXIST
    describe('Given the notification does not exist', function () {
      it('Should return a failure code 404', function (done) {
        _chai["default"].request(_server["default"]).put("/api/notify/0").set('cookie', sellerCookie).end(function (err, res) {
          (0, _chai.expect)(res).to.have.status(404);
          done();
        });
      });
    });
    // IF NOTIFICATION EXISTS
    describe('Given the notification exists', function () {
      console.log(notificationId);
      it('Should return a success code 200', function (done) {
        _chai["default"].request(_server["default"]).put("/api/notify/".concat(notificationId)).set('cookie', sellerCookie).end(function (err, res) {
          (0, _chai.expect)(res).to.have.status(200);
          done();
        });
      });
    });
  });
  // DELETE NOTIFICATION
  describe('Delete notification', function () {
    // IF NOTIFICATION DOES NOT EXIST
    describe('Given the notification does not exist', function () {
      it('Should return a failure code 404', function (done) {
        _chai["default"].request(_server["default"])["delete"]('/api/notify/0').set('cookie', sellerCookie).end(function (err, res) {
          (0, _chai.expect)(res).to.have.status(404);
          done();
        });
      });
    });
    // IF NOTIFICATION EXISTS
    describe('Given the notification exists', function () {
      it('Should return a success code 200', function (done) {
        _chai["default"].request(_server["default"])["delete"]("/api/notify/".concat(notificationId)).set('cookie', sellerCookie).end(function (err, res) {
          (0, _chai.expect)(res).to.have.status(200);
          done();
        });
      });
    });
  });
});