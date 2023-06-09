const deleteOrder = {
  // DEFINITION
  tags: ['Order'], // REQUIRED
  description: 'Delete order', // REQUIRED
  operationId: 'deleteOrder', // REQUIRED

  // PARAMETERS
  parameters: [
    {
      name: 'oId',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/id',
      },
      required: true,
      description: 'ID of the order to be deleted',
    },
  ],

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Order was deleted successfully', // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'Deleted successfully',
          },
        },
      },
    },
    // SERVER ERROR
    500: {
      description: 'Server error', // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'Server error',
          },
        },
      },
    },
    // BAD REQUEST
    404: {
      description: 'Not found', // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'Product not found',
          },
        },
      },
    },
    // USER ALREADY EXISTS
    401: {
      description: 'Unauthorized', // REQUIRED
      content: {
        'application/json': {
          schema: {
            message: 'User not authorized',
          },
        },
      },
    },
  },
};

export default deleteOrder;
