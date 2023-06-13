"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudinary = require("cloudinary");
var _dotenv = _interopRequireDefault(require("dotenv"));
// CONFIGURE DOTENV
_dotenv["default"].config();

// LOAD ENVIROMENT VARIABLES
var _process$env = process.env,
  CLOUDINARY_API_KEY = _process$env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET = _process$env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME = _process$env.CLOUDINARY_CLOUD_NAME;
_cloudinary.v2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});
var uploads = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(file, folder) {
    var options, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          options = {
            folder: folder,
            resource_type: 'auto',
            unique_filename: true,
            use_filename: true
          };
          _context.next = 4;
          return _cloudinary.v2.uploader.upload(file, options);
        case 4:
          response = _context.sent;
          return _context.abrupt("return", response);
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          throw new Error(_context.t0);
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function uploads(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = uploads;
exports["default"] = _default;