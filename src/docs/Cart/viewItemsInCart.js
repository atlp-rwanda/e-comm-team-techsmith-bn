const viewItemInCart = {
  tags: ['Cart'],
  description: 'Viewing items in cart ',
  operationId: 'viewItemInCart',
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
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Cart contents retrieved successfully',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/retrieveResponse' },
        },
      },
    },
    // FORBIDDEN
    403: {
      description: 'User account not active',
      content: {
        'application/json': {
          schema: {
            message:
              'Forbidden access, only buyers are allowed to perform this action',
          },
        },
      },
    },

    // SERVER ERROR
    500: {
      description: 'Failed to retrieve cart contents',
      content: {
        'application/json': { schema: { message: 'Internal server error' } },
      },
    },
  },
};

export default viewItemInCart;
