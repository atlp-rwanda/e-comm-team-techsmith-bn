const getAProduct = {
  // DEFINITION
  tags: ['Admin'], // REQUIRED
  description: 'Get a single product', // REQUIRED
  operationId: 'A single product', // REQUIRED

  // PARAMETERS
  parameters: [
    {
      name: 'id',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/id',
      },
      required: true,
      description: 'ID of the product',
    },
  ],

  // REQUEST BODY
  requestBody: {},

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Products is obtained', // REQUIRED
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

export default getAProduct;
