"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var enableUser = {
  tags: ['Admin'],
  description: 'enable User',
  operationId: 'enableUser',
  // paramers
  parameters: [{
    name: 'id',
    "in": 'path',
    schema: {
      $ref: '#/components/schemas/id'
    },
    required: true,
    description: 'ID to be disabled'
  }],
  // request body
  requestBody: {},
  // responses

  responses: {
    // ok
    200: {
      description: 'enable user successfully',
      content: {
        'application/json': {
          schema: {
            message: 'User successfully enabled'
          }
        }
      }
    },
    // user not found
    404: {
      description: 'user not found',
      content: {
        'application/json': {
          schema: {
            message: 'User not found'
          }
        }
      }
    },
    // unauthorized
    401: {
      description: 'Unauthorized to perform the action',
      content: {
        'application/json': {
          schema: {
            message: 'Login first to perform this action'
          }
        }
      }
    },
    // server error
    500: {
      description: 'server error happened',
      content: {
        'application/json': {
          schema: {
            message: 'Server error'
          }
        }
      }
    }
  }
};
var _default = enableUser;
exports["default"] = _default;