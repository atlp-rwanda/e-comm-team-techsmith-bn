const createProduct = {
  tags: ['Product'],
  description: 'Adding a product in database',
  operationId: 'createProduct',
  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {
    description: 'Product attributes',
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/CreateProduct' },
      },
    },
  },
  // RESPONSES
  responses: {
    // SUCCESS
    201: {
      description: 'Product added successfully',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ProductResponse' },
        },
      },
    },
    // BAD REQUEST
    400: {
      description: 'User submits invalid information',
      content: {
        'application/json': {
          schema: { message: 'Please provide all required information' },
        },
      },
    },
    // UNAUTHORIZED
    401: {
      description: 'User does not have required permissions',
      content: {
        'application/json': {
          schema: { message: 'You must be a seller to add product' },
        },
      },
    },
    // FORBIDDEN
    403: {
      description: 'User account not active',
      content: {
        'application/json': {
          schema: { message: 'Your account is not active' },
        },
      },
    },
    // SERVER ERROR
    500: {
      description: 'Server error',
      content: {
        'application/json': { schema: { message: 'Internal server error' } },
      },
    },
  },
};

export default createProduct;
