const clearItemsInCart = {
  tags: ['Cart'],
  description: 'Clearing items in cart ',
  operationId: 'clearItemInCart',
  // PARAMETERS
  parameters: [],
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Cart contents cleared successfully',
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
      description: 'Failed to clear cart contents',
      content: {
        'application/json': { schema: { message: 'Internal server error' } },
      },
    },
  },
};

export default clearItemsInCart;
