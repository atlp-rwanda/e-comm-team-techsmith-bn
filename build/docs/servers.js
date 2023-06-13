"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var PORT = process.env.PORT;
var servers = [{
  url: "http://localhost:".concat(PORT, "/api"),
  description: 'Local server'
}, {
  url: 'https://e-comm-team-techsmith-bn-staging.onrender.com/api/',
  description: 'Production server'
}];
var _default = servers;
exports["default"] = _default;