const singleOrder = {
  // DEFINITION
  tags: ['Order'], // REQUIRED
  description: 'get single order by id', // REQUIRED
  operationId: 'singleOrder', // REQUIRED

  // PARAMETERS
  parameters: [
    {
      name: 'orderId',
      in: 'path',
      schema: {
        $ref: '#components/schemas/id',
      },
      description: 'ID for single order to be feteched',
      required: true,
    },
  ],

  // REQUEST BODY
  requestBody: {},

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'single order fetched successfully',
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
            message: 'Order not found',
          },
        },
      },
    },
    // FORBIDDEN ACCESS
    403: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action',
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

export default singleOrder;
