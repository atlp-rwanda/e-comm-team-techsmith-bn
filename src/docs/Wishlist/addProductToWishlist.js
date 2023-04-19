const addProductToWishlist = {
  tags: ['Wishlist'],
  description: 'add product to Wishlist',
  operationId: 'addProductToWishlist',

  // PARAMETERS
  parameters: [
    {
      name: 'id',
      description: 'ID of the Product to be added for.',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/id',
        required: true,
      },
    },
  ],
  // RESPONSES
  responses: {
    // SUCESS
    201: {
      description: 'add product into wishlist successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/wishlistResponse',
          },
        },
      },
    },
    401: {
      description: 'Wishlist does not belong to the product table',
      content: {
        'application/json': {
          schema: {
            message:
              'Unauthorized access, please double-check if you are logged in.',
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

export default addProductToWishlist;
