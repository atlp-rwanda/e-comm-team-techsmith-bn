const deliveredOrder = {
  // DEFINITION
  tags: ['Order'], // REQUIRED
  description: 'flad the order as delivered', // REQUIRED
  operationId: 'delivered order', // REQUIRED

  // PARAMETERS
  parameters: [
    {
      name: 'id',
      in: 'path',
      schema: {
        $ref: '#components/schemas/id',
      },
      description: 'ID for the order that was delivered',
      required: true,
    },
  ],

  // REQUEST BODY
  requestBody: {},

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Order was marked as delivered',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Order',
          },
        },
      },
    },
    // not found
    404: {
      description: 'Order not found',
      content: {
        'application/json': {
          schema: {
            message: 'Order not found or already delivered',
          },
        },
      },
    },
    // UNAUTHORIZED
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action',
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
            message: 'Bad request',
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

export default deliveredOrder;
