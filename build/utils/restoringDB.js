"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _require = require('@getvim/execute'),
  execute = _require.execute;
var logger = require('../controllers/logger');
_dotenv["default"].config();
var _process$env = process.env,
  DB_PASSWORD = _process$env.DB_PASSWORD,
  DB_NAME = _process$env.DB_NAME;
function restoring() {
  execute("PGPASSWORD=\"".concat(DB_PASSWORD, "\" pg_restore -C -d postgres ").concat(DB_NAME, ".pgsql")).then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          logger.databaseLogger.info('Database restore complete');
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })))["catch"](function (err) {
    logger.databaseLogger.error("/  Database restore failed : ".concat(err.message));
  });
}
var _default = restoring;
exports["default"] = _default;