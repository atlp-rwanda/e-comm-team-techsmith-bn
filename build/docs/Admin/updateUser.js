"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var updateUser = {
  tags: ['Admin'],
  description: 'Update user By Admin',
  operationId: 'updateUser',
  // parameters
  parameters: [{
    name: 'id',
    "in": 'path',
    schema: {
      $ref: '#components/schemas/id'
    },
    required: true,
    description: 'id for the user to be updated'
  }],
  // request body
  requestBody: {
    description: 'Data to be updated',
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
      description: 'User Succesfully updated',
      content: {
        'application/json': {
          schema: {
            message: 'Update Successfully'
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
    // Bad request invalid email or password
    400: {
      description: 'Invalid email or password',
      content: {
        'application/json': {
          schema: {
            message: 'You provided invalid email or password'
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
var _default = updateUser;
exports["default"] = _default;