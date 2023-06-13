"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var registerUser = {
  // DEFINITION
  tags: ['User'],
  // REQUIRED
  description: 'Register a new user',
  // REQUIRED
  operationId: 'registerUser',
  // REQUIRED

  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {
    description: 'Information of the user to be registered',
    // REQUIRED
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/registerUser' // REQUIRED
        }
      }
    }
  },

  // RESPONSES
  responses: {
    // SUCCESS
    201: {
      description: 'User was registered successfully',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserRegistered' // REQUIRED
          }
        }
      }
    },

    // SERVER ERROR
    500: {
      description: 'Server error',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'Server error'
          }
        }
      }
    },
    // BAD REQUEST
    400: {
      description: 'Bad request',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'Invalid email or password'
          }
        }
      }
    },
    // USER ALREADY EXISTS
    409: {
      description: 'User already exists',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'User already exists'
          }
        }
      }
    }
  }
};
var _default = registerUser;
exports["default"] = _default;