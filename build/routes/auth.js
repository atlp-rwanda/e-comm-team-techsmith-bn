"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _passportGoogleOauth = require("passport-google-oauth2");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _index = _interopRequireDefault(require("../../database/models/index.js"));
var googleStrategy = _passportGoogleOauth.Strategy;
var router = _express["default"].Router();
var user = _index["default"].user;
var temp = [];
_dotenv["default"].config();
var _process$env = process.env,
  CLIENTID = _process$env.CLIENTID,
  CLIENTSECRET = _process$env.CLIENTSECRET,
  CALLBACKURL = _process$env.CALLBACKURL,
  FRONTENDURL = _process$env.FRONTENDURL;
/* eslint-disable */
_passport["default"].serializeUser(function (user, done) {
  done(null, user.googleId);
});
/* eslint-disable */
_passport["default"].deserializeUser( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id, done) {
    var currentUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log('Deserializing user with ID:', id);
          _context.prev = 1;
          _context.next = 4;
          return user.findOne({
            where: {
              id: id
            }
          });
        case 4:
          currentUser = _context.sent;
          done(null, currentUser);
          _context.next = 11;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          done(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 8]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
_passport["default"].use(new googleStrategy({
  // options for google authentifications
  callbackURL: "".concat(CALLBACKURL, "/api/auth/google/redirect"),
  clientID: CLIENTID,
  clientSecret: CLIENTSECRET
},
/*#__PURE__*/
/* eslint-disable */
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accessToken, refreshToken, profile, done) {
    var currentUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return user.findOne({
            where: {
              email: profile.email
            }
          });
        case 3:
          currentUser = _context2.sent;
          if (!currentUser) {
            _context2.next = 14;
            break;
          }
          if (!(currentUser.googleId === null)) {
            _context2.next = 11;
            break;
          }
          _context2.next = 8;
          return user.update({
            googleId: profile.id
          }, {
            where: {
              email: profile.email
            }
          });
        case 8:
          done(null, currentUser);
          _context2.next = 12;
          break;
        case 11:
          done(null, currentUser);
        case 12:
          _context2.next = 17;
          break;
        case 14:
          temp.push(profile.email);
          temp.push(profile.displayName);
          done(null, false);
        case 17:
          _context2.next = 22;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          done(_context2.t0);
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return function (_x3, _x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}()));
router.get('/google', _passport["default"].authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/google/redirect', function (req, res, next) {
  _passport["default"].authenticate('google', function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      var emailRedirect = temp[0];
      var nameRedirect = temp[1];
      var redirectUrl = "".concat(FRONTENDURL, "/signup?email=").concat(encodeURIComponent(emailRedirect), "&name=").concat(encodeURIComponent(nameRedirect));
      return res.redirect(redirectUrl);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      var token = _jsonwebtoken["default"].sign({
        id: user.email,
        roleId: user.roleId
      }, process.env.USER_SECRET, {
        expiresIn: '1h'
      });
      var redirectUrl = "".concat(FRONTENDURL, "/?token=").concat(token);
      return res.redirect(redirectUrl);
    });
  })(req, res, next);
});
var _default = router;
exports["default"] = _default;