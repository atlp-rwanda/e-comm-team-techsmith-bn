"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var addItemInCart = {
  tags: ['Cart'],
  description: 'Adding a item buyer Cart table in database',
  operationId: 'addIteminCart',
  // PARAMETERS
  parameters: [{
    name: 'id',
    description: 'ID of the Product to be added for.',
    "in": 'path',
    schema: {
      $ref: '#/components/schemas/id',
      required: true
    }
  }],
  // RESPONSES
  responses: {
    // SUCCESS
    201: {
      description: 'Items are added successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/CartResponse'
          }
        }
      }
    },
    // UNAUTHORIZED
    401: {
      description: 'User does not have required permissions',
      content: {
        'application/json': {
          schema: {
            message: 'Unauthorized access, please double-check if you are logged in'
          }
        }
      }
    },
    // FORBIDDEN
    403: {
      description: 'User account not active',
      content: {
        'application/json': {
          schema: {
            message: 'Forbidden access, only buyers are allowed to perform this action'
          }
        }
      }
    },
    // BAD REQUEST
    404: {
      description: 'User submits invalid information',
      content: {
        'application/json': {
          schema: {
            message: 'Product not found'
          }
        }
      }
    },
    409: {
      description: 'User submits invalid information',
      content: {
        'application/json': {
          schema: {
            message: 'Product already in cart'
          }
        }
      }
    },
    // SERVER ERROR
    500: {
      description: 'Server error',
      content: {
        'application/json': {
          schema: {
            message: 'Internal server error'
          }
        }
      }
    }
  }
};
var _default = addItemInCart;
exports["default"] = _default;