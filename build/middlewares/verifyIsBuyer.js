"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _cookies = require("../utils/cookies.js");
// CONFIGURE DOTENV
_dotenv["default"].config();

// LOAD ENVIRONMENT VARIABLES
var secret = process.env.USER_SECRET;
var logger = require('../controllers/logger');
var isBuyer = function isBuyer(req, res, next) {
  // CATCH COOKIE FROM REQUEST
  var cookie = (0, _cookies.getCookie)(req);
  try {
    // CHECK IF COOKIE IS NOT VALID
    if (!cookie) {
      logger.userLogger.error('/POST statusCode: 401 : Unauthorized access, Login required');
      return res.status(401).json({
        message: 'Unauthorized access, please double-check if you are logged in'
      });
    }

    // EXTRACT TOKEN FROM COOKIE
    var token = (0, _cookies.getToken)(req);

    // CHECK IF TOKEN IS NOT VALID
    if (!token) {
      logger.userLogger.error('/POST statusCode: 401 : Unauthorized access,token required');
      return res.status(401).json({
        message: 'Unauthorized access,  please double-check if you are logged in'
      });
    }

    // VERIFY TOKEN
    var _jwt$verify = _jsonwebtoken["default"].verify(token, secret),
      id = _jwt$verify.id,
      role = _jwt$verify.role;

    // VERIFY IF USER IS NOT A BUYER
    if (role !== 3) {
      logger.userLogger.error('/POST statusCode: 403 : Forbidden access,Only buyer is allowed to perform the action');
      return res.status(403).json({
        message: 'Forbidden access, only buyers are allowed to perform this action'
      });
    }

    // PASSING THE USER ID IN THE CONTROLLER
    res.locals = {
      id: id,
      role: role
    };

    // RETURN NEXT
    return next();
  } catch (error) {
    logger.userLogger.error("/POST statusCode: 500 : verifyIsBuyer failed ".concat(error.message));
    return res.status(500).json({
      message: error.message
    });
  }
};
var _default = isBuyer;
exports["default"] = _default;