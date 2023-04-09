const getOrders = {
  // DEFINITION
  tags: ['Order'], // REQUIRED
  description: 'Get all orders', // REQUIRED
  operationId: 'getOrders', // REQUIRED

  // PARAMETERS
  parameters: [],

  // REQUEST BODY
  requestBody: {},

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Password updated successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Order',
          },
        },
      },
    },
    // UNAUTHORIZED
    401: {
      description: 'Unauthenticated',
      content: {
        'application/json': {
          schema: {
            message: 'You are not logged in',
          },
        },
      },
    },
    // BAD REQUEST
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            message: 'User not authorized',
          },
        },
      },
    },
    // SERVER ERROR
    500: {
      description: 'Server error',
      content: {
        'application/json': {
          schema: {
            message: 'Internal server error',
          },
        },
      },
    },
  },
};

export default getOrders;
