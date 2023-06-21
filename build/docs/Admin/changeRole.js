"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var userPermissions = {
  tags: ['Admin'],
  description: 'Change Role',
  operationId: 'changeId',
  // parameters:

  parameters: [{
    name: 'id',
    "in": 'path',
    schema: {
      $ref: '#/components/schemas/id'
    },
    required: true,
    description: 'ID of the user to be assigned a new role'
  }, {
    name: 'role',
    "in": 'path',
    schema: {
      $ref: '#/components/schemas/id'
    },
    required: true,
    description: 'New role to be assigned to the user'
  }],
  // request body

  requestBody: {},
  responses: {
    // success
    200: {
      desciption: 'User role changed successful',
      content: {
        'application/json': {
          schema: {
            message: 'user successfully updated'
          }
        }
      }
    },
    // not found
    404: {
      description: 'Failed to disable user',
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
      desciption: 'User unauthorized to perform the action',
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
      description: 'Internal server error',
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
var _default = userPermissions;
exports["default"] = _default;