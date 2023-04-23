const getProduct = {
  // DEFINITION
  tags: ['Admin'], // REQUIRED
  description: 'Get all products', // REQUIRED
  operationId: 'allProducts', // REQUIRED

  // PARAMETERS
  parameters: [],

  // REQUEST BODY
  requestBody: {},

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Products were obtained', // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductResponse',
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

export default getProduct;
