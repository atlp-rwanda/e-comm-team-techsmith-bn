const updateOrder = {
  // DEFINITION
  tags: ['Order'], // REQUIRED
  description: 'Update order', // REQUIRED
  operationId: 'updateOrder', // REQUIRED

  // PARAMETERS
  parameters: [
    {
      name: 'oId',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/id',
      },
      required: true,
      description: 'ID of the order to be updated',
    },
  ],

  // REQUEST BODY
  requestBody: {
    description: 'Information of the order to be updated', // REQUIRED
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/updateOrder', // REQUIRED
        },
      },
    },
  },

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Order was updated successfully', // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/updateOrder', // REQUIRED
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

export default updateOrder;
