"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _cookies = require("../utils/cookies");
var logger = require('../controllers/logger');
var checkIsLoggedIn = function checkIsLoggedIn(req, res, next) {
  try {
    var cookie = (0, _cookies.getCookie)(req);
    // CHECK IF COOKIE EXISTS
    if (!cookie) {
      logger.userLogger.error('/POST statusCode: 401 : Unauthorized access, Login required');
      return res.status(401).send({
        message: 'Please log in to perform this action'
      });
    }
    // GET TOKEN FROM COOKIE
    var token = (0, _cookies.getToken)(req);
    // eslint-disable-next-line no-console
    // IF NOT TOKEN IS FOUND
    if (!token) {
      logger.userLogger.error('/POST statusCode: 400 : Unauthorized access, token required');
      return res.status(400).send({
        message: 'Could not verify your authentication'
      });
    }
    // GET USER ID AND ROLE FROM TOKEN
    var _jwt$verify = _jsonwebtoken["default"].verify(token, process.env.USER_SECRET),
      id = _jwt$verify.id,
      role = _jwt$verify.role;

    // RETURN USER ID AND ROLE
    res.locals = {
      id: id,
      role: role
    };
    // PROCEED IF USER IS ADMIN
    next();
  } catch (error) {
    logger.userLogger.error("/POST statusCode: 500 : Check if user logged in failed:".concat(error.message));
    return res.status(500).json({
      message: error.message
    });
  }
};
var _default = checkIsLoggedIn;
exports["default"] = _default;