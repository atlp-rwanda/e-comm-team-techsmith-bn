"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _userValidation = require("../utils/userValidation.js");
var _excluded = ["password"];
// LOAD MODELS FROM DATABASE
var user = _index["default"].user,
  Role = _index["default"].role;
var logger = require('./logger');

/* ADMIN CONTROLLER */
var adminControllers = /*#__PURE__*/function () {
  function adminControllers() {
    (0, _classCallCheck2["default"])(this, adminControllers);
  }
  (0, _createClass2["default"])(adminControllers, null, [{
    key: "getUsers",
    value: // GET ALL USERS
    function () {
      var _getUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var pageAsNumber, sizeAsNumber, page, size, offset, allUsers, totalPages, currentPage, prevPage, nextPage;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              pageAsNumber = Number.parseInt(req.query.page, 10);
              sizeAsNumber = Number.parseInt(req.query.size, 10);
              page = 1;
              if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) {
                page = pageAsNumber;
              }
              size = 5;
              if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
                size = sizeAsNumber;
              }
              offset = (page - 1) * size;
              _context.next = 10;
              return user.findAndCountAll({
                include: {
                  model: Role,
                  as: 'role',
                  attributes: ['name']
                },
                attributes: {
                  exclude: ['password']
                },
                limit: size,
                offset: offset
              });
            case 10:
              allUsers = _context.sent;
              totalPages = Math.ceil(allUsers.count / size);
              currentPage = page > totalPages ? totalPages : page;
              prevPage = currentPage === 1 ? null : currentPage - 1;
              nextPage = currentPage === totalPages ? null : currentPage + 1;
              if (!(allUsers.rows.length === 0)) {
                _context.next = 18;
                break;
              }
              logger.userLogger.info(' /GET statusCode: 404 : No users found on a page ');
              return _context.abrupt("return", res.status(404).json({
                message: "There is no items found on page ".concat(page)
              }));
            case 18:
              logger.userLogger.info(' /GET statusCode: 200 : List of users on a page ');
              return _context.abrupt("return", res.status(200).json({
                message: "List of all ".concat(allUsers.count, " users"),
                data: {
                  totalItems: allUsers.count,
                  totalPages: totalPages,
                  pageSize: size,
                  currentPage: currentPage,
                  prevPage: prevPage,
                  nextPage: nextPage,
                  payments: allUsers.rows
                }
              }));
            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](0);
              logger.userLogger.error(" /GET statusCode: 500 :".concat(_context.t0.message));
              return _context.abrupt("return", res.status(500).json({
                message: _context.t0.message
              }));
            case 26:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 22]]);
      }));
      function getUsers(_x, _x2) {
        return _getUsers.apply(this, arguments);
      }
      return getUsers;
    }() // DELETE USER
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, userToBeDeleted;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              id = req.params.id;
              _context2.next = 4;
              return user.destroy({
                where: {
                  id: id
                }
              });
            case 4:
              userToBeDeleted = _context2.sent;
              if (userToBeDeleted) {
                _context2.next = 8;
                break;
              }
              logger.userLogger.error(' /DELETE statusCode: 404 : User not found');
              return _context2.abrupt("return", res.status(404).json({
                message: "user with id: ".concat(id, " is not found")
              }));
            case 8:
              logger.userLogger.error(' /GET statusCode: 204 : User deleted by admin');
              return _context2.abrupt("return", res.status(200).json({
                message: "User with id: ".concat(id, " is deleted")
              }));
            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              logger.userLogger.error(" /DELETE statusCode: 500 : Delete user by Admin failed ".concat(_context2.t0.message));
              return _context2.abrupt("return", res.status(500).json({
                message: _context2.t0.message
              }));
            case 16:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 12]]);
      }));
      function deleteUser(_x3, _x4) {
        return _deleteUser.apply(this, arguments);
      }
      return deleteUser;
    }() //   CREATE USER
  }, {
    key: "createUsers",
    value: function () {
      var _createUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _req$body, name, email, password, role, gender, validEmail, validPassword, hashedPassword, userExists, newUser, _newUser$dataValues, userPassword, userDetails;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, role = _req$body.role, gender = _req$body.gender;
              validEmail = (0, _userValidation.validateEmail)(email);
              validPassword = (0, _userValidation.validatePassword)(password); // INVALID EMAIL
              if (!(!validEmail || !validPassword)) {
                _context3.next = 7;
                break;
              }
              logger.userLogger.error(' /POST statusCode: 401 : Invalid credentials');
              return _context3.abrupt("return", res.status(401).json({
                message: 'Invalid email or password'
              }));
            case 7:
              _context3.next = 9;
              return _bcrypt["default"].hash(password, 10);
            case 9:
              hashedPassword = _context3.sent;
              _context3.next = 12;
              return user.findOne({
                where: {
                  email: email
                }
              });
            case 12:
              userExists = _context3.sent;
              if (!userExists) {
                _context3.next = 16;
                break;
              }
              logger.userLogger.error(' /GET statusCode: 409 : User already exists');
              return _context3.abrupt("return", res.status(409).json({
                message: 'User already exists',
                user: userExists
              }));
            case 16:
              _context3.next = 18;
              return user.create({
                name: name,
                email: email,
                password: hashedPassword,
                roleId: role,
                isActive: true,
                gender: gender,
                passcodeModifiedAt: Date.now(),
                birthDate: new Date(),
                preferredLanguage: 'rw',
                preferredCurrency: 'RWF',
                physicalAddress: 'Rwanda'
              });
            case 18:
              newUser = _context3.sent;
              _newUser$dataValues = newUser.dataValues, userPassword = _newUser$dataValues.password, userDetails = (0, _objectWithoutProperties2["default"])(_newUser$dataValues, _excluded);
              logger.userLogger.info(' /POST statusCode: 201 : User created');
              return _context3.abrupt("return", res.status(201).json({
                message: 'User created successfully',
                data: userDetails
              }));
            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3["catch"](0);
              logger.userLogger.error(" /POST statusCode: 500  : Create user failed ".concat(_context3.t0.message));
              return _context3.abrupt("return", res.status(500).json({
                message: _context3.t0.message
              }));
            case 28:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[0, 24]]);
      }));
      function createUsers(_x5, _x6) {
        return _createUsers.apply(this, arguments);
      }
      return createUsers;
    }() // UPDATE USER
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, _req$body2, name, gender, userUpdated;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              id = req.params.id;
              _req$body2 = req.body, name = _req$body2.name, gender = _req$body2.gender;
              _context4.next = 5;
              return user.update({
                name: name,
                gender: gender
              }, {
                where: {
                  id: id
                },
                returning: true,
                attributes: {
                  exclude: ['password']
                }
              }, {
                "new": true
              });
            case 5:
              userUpdated = _context4.sent;
              if (userUpdated) {
                _context4.next = 9;
                break;
              }
              logger.userLogger.error(' /PUT statusCode: 404 : User not found');
              return _context4.abrupt("return", res.status(404).json({
                message: "user with id: ".concat(id, " is not found")
              }));
            case 9:
              logger.userLogger.info(' /PUT statusCode: 200 : User updated');
              return _context4.abrupt("return", res.status(200).json({
                message: "User with id:".concat(id, " is updated successfully"),
                data: userUpdated
              }));
            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              logger.userLogger.error(" /PUT statusCode: 500 : User not updated ".concat(_context4.t0.message));
              return _context4.abrupt("return", res.status(500).json({
                message: _context4.t0.message
              }));
            case 17:
            case "end":
              return _context4.stop();
          }
        }, _callee4, null, [[0, 13]]);
      }));
      function updateUser(_x7, _x8) {
        return _updateUser.apply(this, arguments);
      }
      return updateUser;
    }()
  }]);
  return adminControllers;
}();
var _default = adminControllers;
exports["default"] = _default;