const getOrders = {
  // DEFINITION
  tags: ['Order'], // REQUIRED
  description: 'Get all orders', // REQUIRED
  operationId: 'getOrders', // REQUIRED

  // PARAMETERS
  parameters: [
    
    {
      name: 'page',
      in: 'query',
      description: 'Page number',
      required: true,
      schema: {
        type: 'integer',
      },
    },
    {
      name: 'size',
      in: 'query',
      description: 'Number of items per page',
      required: false,
      schema: {
        type: 'integer',
        default: 20,
      },
    },
  ],

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
            message: 'You are not logged in Or you need to login as admin to perform this action',
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
