const getAllProductToWishlist = {
  tags: ['Wishlist'],
  description: 'Getting Product in wishlist ',
  operationId: 'addProductToWishlist',
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
      description: 'Your wishlist products contents retrieved successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/getAllWishlistResponse',
          },
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

    // NOT FOUND
    404: {
      description: 'One of the required relation (product) not found.',
      content: {
        'application/json': {
          schema: {
            message: 'Product not found.',
          },
        },
      },
    },
    // SERVER ERROR
    500: {
      description: 'Failed to retrieve wishlist contents',
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

export default getAllProductToWishlist;
