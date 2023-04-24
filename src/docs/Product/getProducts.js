const getProducts = {
  // DEFINITION
  tags: ['Product'], // REQUIRED
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

const getProductById = {
  // DEFINITION
  tags: ['Product'], // REQUIRED
  description: 'Buyer Get product by Id', // REQUIRED
  operationId: 'One product', // REQUIRED

  // PARAMETERS
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'id of required product',
      required: true,
      schema: {
        $ref: '#/components/schemas/id',
      },
    },
  ],

  // REQUEST BODY
  requestBody: {},

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Product found', // REQUIRED
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

const getOneFromMine = {
  // DEFINITION
  tags: ['Product'], // REQUIRED
  description: 'Seller get single product', // REQUIRED
  operationId: 'one product', // REQUIRED

  // PARAMETERS
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'id',
      required: true,
      schema: {
        $ref: '#/components/schemas/id',
      },
    },
  ],

  // REQUEST BODY
  requestBody: {},

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'The product retrieved successfully', // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductResponse',
          },
        }, // REQUIRED
      }, // REQUIRED
    },

    404: {
      description: 'Failure',
      content: {
        'application/json': {
          schema: { message: 'The product is not available ' },
        },
      },
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

export { getProducts, getProductById, getOneFromMine };
