"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _child_process = require("child_process");
_dotenv["default"].config();
var _process$env = process.env,
  DB_USER = _process$env.DB_USER,
  DB_NAME = _process$env.DB_NAME,
  DB_PASSWORD = _process$env.DB_PASSWORD,
  DB_HOST = _process$env.DB_HOST;
function backUp() {
  // Use 'cmd.exe' as the shell on Windows
  var shell = process.platform === 'win32' ? 'cmd.exe' : '/bin/bash';
  var command = process.platform === 'win32' ? "set PGPASSWORD=".concat(DB_PASSWORD, " pg_dump -Fc -U ").concat(DB_USER, " -d ").concat(DB_NAME, " -h ").concat(DB_HOST, " -f ").concat(DB_NAME, ".pgsql") : "PGPASSWORD=".concat(DB_PASSWORD, " pg_dump -Fc -U ").concat(DB_USER, " -d ").concat(DB_NAME, " -h ").concat(DB_HOST, " -f ").concat(DB_NAME, ".pgsql");
  // Pass the command and arguments as separate strings to spawn
  var args = process.platform === 'win32' ? ['/c', command] : ['-c', command];
  var childProcess = (0, _child_process.spawn)(shell, args);
  childProcess.stderr.on('message', function (data) {
    // eslint-disable-next-line no-console
    console.error("stderr: ".concat(data));
  });
  childProcess.on('close', function (code) {
    // eslint-disable-next-line no-console
    console.log("child process exited with code ".concat(code));
  });
}
var _default = backUp;
exports["default"] = _default;