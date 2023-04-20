const searchProducts = {
  // DEFINITION
  tags: ['Product'], // REQUIRED
  description: 'user can search products', // REQUIRED
  operationId: 'searchProducts', // REQUIRED

  // PARAMETERS
  // parameters: [],

  // REQUEST BODY
  requestBody: {
    description: 'Product attributes',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SearchProduct' },
      },
    },
  },

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: '2 products found', // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SearchProductResponse',
          },
        }, // REQUIRED
      }, // REQUIRED
    },

    // ERROR
    500: {
      description: 'Server error', // REQUIRED
      content: {
        'application/json': {
          schema: {}, // EMPTY SCHEMA
        }, // REQUIRED
      }, // REQUIRED
    },
  }, // REQUIRED
};

export default searchProducts;
