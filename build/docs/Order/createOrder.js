"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var createOrder = {
  // DEFINITION
  tags: ['Order'],
  // REQUIRED
  description: 'Create a new order',
  // REQUIRED
  operationId: 'createOrder',
  // REQUIRED

  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {
    description: 'Information of the order to be created',
    // REQUIRED
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/createOrder' // REQUIRED
        }
      }
    }
  },

  // RESPONSES
  responses: {
    // SUCCESS
    201: {
      description: 'Order was created successfully',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/createOrder' // REQUIRED
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
    404: {
      description: 'Not found',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'Product not found'
          }
        }
      }
    },
    // USER ALREADY EXISTS
    401: {
      description: 'Unauthorized',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'User not authorized'
          }
        }
      }
    }
  }
};
var _default = createOrder;
exports["default"] = _default;