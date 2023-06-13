"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var deleteUser = {
  tags: ['Admin'],
  description: 'Delete user By Admin',
  operationId: 'deleteUser',
  // parameters
  parameters: [{
    name: 'id',
    "in": 'path',
    schema: {
      $ref: '#components/schemas/id'
    },
    required: true,
    description: 'id for the user to be deleted'
  }],
  // request body
  requestBody: {
    description: 'Data to be deleted',
    content: {
      'application/json': {
        schema: {
          $ref: '#components/schemas/registerUser'
        }
      }
    }
  },
  // response
  responses: {
    // user created
    200: {
      description: 'User Succesfully deleted',
      content: {
        'application/json': {
          schema: {
            message: 'deleted Successfully'
          }
        }
      }
    },
    // NOT FOUND
    404: {
      description: 'User not found',
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
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action'
          }
        }
      }
    },
    // server error
    500: {
      description: 'Server error happened',
      content: {
        'application/json': {
          shema: {
            message: 'server error happend.. Please reload'
          }
        }
      }
    }
  }
};
var _default = deleteUser;
exports["default"] = _default;