"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _servers = _interopRequireDefault(require("./servers.js"));
var _tags = _interopRequireDefault(require("./tags.js"));
var _paths = _interopRequireDefault(require("./paths.js"));
var _components = _interopRequireDefault(require("./components.js"));
var options = {
  definition: {
    openapi: '3.0.3',
    // Present supported openapi version
    info: {
      title: 'Techsmiths E-Commerce',
      // Title (required)
      description: 'Docs for Techsmiths E-Commerce',
      // Description (required)
      version: '1.0.0',
      // Version (required)
      contact: {
        name: 'Techsmiths',
        // Name of the author
        email: '',
        // Email of the author
        url: '' // Website of the author
      }
    },

    servers: _servers["default"],
    // Servers imported from src/docs/servers.js
    tags: _tags["default"],
    // Tags imported from src/docs/tags.js
    components: _components["default"],
    // Components imported from src/docs/components.js,
    paths: _paths["default"]
  },
  apis: ['../routes/*.js', '../docs/**/*.js'] // Path to the API docs
};
var _default = options;
exports["default"] = _default;