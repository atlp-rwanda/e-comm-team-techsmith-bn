"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var onWay = {
  // DEFINITION
  tags: ['Order'],
  // REQUIRED
  description: 'flag order as on way',
  // REQUIRED
  operationId: 'order on way',
  // REQUIRED

  // PARAMETERS
  parameters: [{
    name: 'id',
    "in": 'path',
    schema: {
      $ref: '#components/schemas/id'
    },
    description: 'ID for the order on the way',
    required: true
  }],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Order was marked as on way',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Order'
          }
        }
      }
    },
    // not found
    404: {
      description: 'Order not found',
      content: {
        'application/json': {
          schema: {
            message: 'Order not found'
          }
        }
      }
    },
    // UNAUTHORIZED
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
    // BAD REQUEST
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            message: 'Bad request'
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
var _default = onWay;
exports["default"] = _default;