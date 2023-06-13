"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var _userValidation = require("../utils/userValidation.js");
var _emails = require("../utils/emails.js");
var _excluded = ["password"],
  _excluded2 = ["password"];
var user = _index["default"].user;
var secret = process.env.USER_SECRET;
var logger = require('./logger');
//  REGISTER USER
var registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var token, _req$body, username, userEmail, password, role, userGender, userBirthDate, userPreferredLanguage, userPreferredCurrency, userPhysicalAddress, userTelephone, hashedPassword, userExists, _userExists$dataValue, userPassword, userDetails, validEmail, validPassword, newUser, _newUser$dataValues, _userPassword, _userDetails;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // TOKEN
          token = null;
          _context.prev = 1;
          _req$body = req.body, username = _req$body.name, userEmail = _req$body.email, password = _req$body.password, role = _req$body.role, userGender = _req$body.gender, userBirthDate = _req$body.birthDate, userPreferredLanguage = _req$body.preferredLanguage, userPreferredCurrency = _req$body.preferredCurrency, userPhysicalAddress = _req$body.physicalAddress, userTelephone = _req$body.telephone;
          _context.next = 5;
          return _bcrypt["default"].hash(password, 10);
        case 5:
          hashedPassword = _context.sent;
          _context.next = 8;
          return user.findOne({
            where: {
              email: userEmail
            }
          });
        case 8:
          userExists = _context.sent;
          if (!userExists) {
            _context.next = 12;
            break;
          }
          _userExists$dataValue = userExists.dataValues, userPassword = _userExists$dataValue.password, userDetails = (0, _objectWithoutProperties2["default"])(_userExists$dataValue, _excluded);
          return _context.abrupt("return", res.status(409).json({
            message: 'User already exists',
            user: userDetails
          }));
        case 12:
          // VALIDATE USER EMAIL
          validEmail = (0, _userValidation.validateEmail)(userEmail); // VALIDATE USER PASSWORD
          validPassword = (0, _userValidation.validatePassword)(password); // LOG VALIDATION RESULTS
          /* REGISTER USER IF EMAIL AND PASSWORD ARE VALID */
          if (!(validEmail && validPassword)) {
            _context.next = 25;
            break;
          }
          _context.next = 17;
          return user.create({
            name: username,
            email: userEmail,
            password: hashedPassword,
            roleId: role,
            isActive: true,
            gender: userGender,
            passcodeModifiedAt: Date.now(),
            birthDate: userBirthDate || new Date(),
            preferredLanguage: userPreferredLanguage || 'rw',
            preferredCurrency: userPreferredCurrency || 'RWF',
            physicalAddress: userPhysicalAddress || 'Rwanda',
            telephone: userTelephone || '0788888888'
          });
        case 17:
          newUser = _context.sent;
          // Create token
          token = _jsonwebtoken["default"].sign({
            id: newUser.id,
            role: role
          }, secret, {
            expiresIn: 604800
          });
          // Set token in cookie
          res.cookie('Authorized', token, {
            httpOnly: true,
            maxAge: 604800
          });
          //  Send email
          _context.next = 22;
          return (0, _emails.nodeMail)(userEmail, username, 'Welcome to the team', _emails.registerMessageTemplate, token);
        case 22:
          //  Return User
          _newUser$dataValues = newUser.dataValues, _userPassword = _newUser$dataValues.password, _userDetails = (0, _objectWithoutProperties2["default"])(_newUser$dataValues, _excluded2);
          logger.userLogger.info('/POST statusCode: 201 : User account created successfully ');
          return _context.abrupt("return", res.status(201).json({
            ok: true,
            message: 'User created successfully',
            Authorization: token,
            user: _userDetails
          }));
        case 25:
          if (validEmail) {
            _context.next = 28;
            break;
          }
          logger.userLogger.error('/POST statusCode: 400 : Invalid email provided ');
          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid email'
          }));
        case 28:
          if (validPassword) {
            _context.next = 31;
            break;
          }
          logger.userLogger.error('/POST statusCode: 400 : Invalid password provided ');
          return _context.abrupt("return", res.status(400).json({
            message: 'Invalid password'
          }));
        case 31:
          _context.next = 37;
          break;
        case 33:
          _context.prev = 33;
          _context.t0 = _context["catch"](1);
          // CATCH ERROR
          logger.userLogger.error("/POST statusCode: 500 : Creating user account  failed: ".concat(_context.t0.message, " "));
          return _context.abrupt("return", res.status(500).json({
            message: _context.t0.message,
            ok: false
          }));
        case 37:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 33]]);
  }));
  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = registerUser;
exports["default"] = _default;