"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var getUsers = {
  tags: ['Admin'],
  description: 'Getting all users Avalible in the database',
  operationId: 'getusers',
  // parameters
  parameters: [{
    name: 'page',
    "in": 'query',
    description: 'Page number',
    required: true,
    schema: {
      type: 'integer'
    }
  }, {
    name: 'pageSize',
    "in": 'query',
    description: 'Number of items per page',
    required: false,
    schema: {
      type: 'integer',
      "default": 20
    }
  }],
  // request body
  requestBody: {},
  responses: {
    200: {
      description: 'All users were found',
      content: {
        'application/json': {
          schema: {
            message: 'All users found successfully'
          }
        }
      }
    },
    500: {
      description: 'Server Error',
      content: {
        'application/json': {
          schema: {
            message: 'Server Erro happend. Please reload!'
          }
        }
      }
    }
  }
};
var _default = getUsers;
exports["default"] = _default;