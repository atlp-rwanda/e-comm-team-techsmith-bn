"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var createFeedback = {
  // DEFINITION
  tags: ['Feedback'],
  // REQUIRED
  description: 'Creation of a product feedback',
  // REQUIRED
  operationId: 'feedbackCreate',
  // REQUIRED

  // PARAMETERS
  parameters: [{
    name: 'pId',
    "in": 'path',
    schema: {
      $ref: '#/components/schemas/id'
    },
    required: true,
    description: 'ID of the product '
  }],
  // REQUEST BODY
  requestBody: {
    description: 'A route for a user to create a feedback',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/feedbackBody'
        }
      }
    }
  },
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Feedback was successfully sent',
      content: {
        'application/json': {
          schema: {
            message: 'Feedback was successfully sent'
          }
        }
      }
    },
    // not found
    404: {
      description: 'Feedback not created',
      content: {
        'application/json': {
          schema: {
            message: 'Feedback not saved'
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
var _default = createFeedback;
exports["default"] = _default;