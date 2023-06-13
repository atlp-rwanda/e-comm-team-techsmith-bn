"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var requestSubscribe = {
  tags: ['Newsletter'],
  description: 'Request to subscribe to the newsletter',
  operationId: 'requestSubscribe',
  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {
    description: 'Request to subscribe to the newsletter',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/requestSubscription'
        }
      }
    }
  },
  // RESPONSES
  responses: {
    // SUCCESS RESPONSE
    201: {
      description: 'User successfully requested to subscribe to the newsletter',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/requestSubscriptionResponse'
          }
        }
      }
    },
    // BAD REQUEST
    400: {
      description: 'User submitted invalid information',
      content: {
        'application/json': {
          schema: {
            message: 'Invalid email'
          }
        }
      }
    },
    // USER ALREADY EXISTS
    409: {
      description: 'User already subscribed',
      content: {
        'application/json': {
          schema: {
            message: 'Your email is already subscribed to our newsletter'
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
var _default = requestSubscribe;
exports["default"] = _default;