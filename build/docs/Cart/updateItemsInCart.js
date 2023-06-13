"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var updateItemInCart = {
  tags: ['Cart'],
  description: 'Updating item quantity in  Cart',
  operationId: 'updateIteminCart',
  // PARAMETERS
  parameters: [{
    name: 'id',
    description: 'ID of the Product to be updated for.',
    "in": 'path',
    schema: {
      $ref: '#/components/schemas/id',
      required: true
    }
  }],
  // REQUEST BODY
  requestBody: {
    description: 'A route to update a product in the cart ',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/updateItem'
        }
      }
    }
  },
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Item is updated successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/updatedItem'
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
var _default = updateItemInCart;
exports["default"] = _default;