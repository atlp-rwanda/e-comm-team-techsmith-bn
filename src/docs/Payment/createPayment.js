const addPayment = {
  tags: ['Order'],
  description: 'Creating payment for a particular order using Stripe API',
  operationId: 'addPayment',

  // PARAMETERS
  parameters: [
    {
      name: 'id',
      description: 'ID of the order to be paid for.',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/id',
        required: true,
      },
    },
  ],

  // REQUEST BODY
  requestBody: {
    description: 'Payment information',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/PaymentRequest',
        },
      },
    },
  },

  // RESPONSES
  responses: {
    // SUCESS
    201: {
      description: 'Payment successful',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/PaymentReponse',
          },
        },
      },
    },
    // NOT FOUND
    404: {
      description:
        'One of the required relations (order, user, product) not found.',
      content: {
        'application/json': {
          schema: {
            message: 'Order, Product, or User not found',
          },
        },
      },
    },
    // FORBIDDEN
    403: {
      description: 'Cannot pay for an order that does not belong to you',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to make this payment',
          },
        },
      },
    },
    // CONFLICT
    409: {
      description: 'Order already paid for',
      content: {
        'application/json': {
          schema: {
            message: 'You have already paid for this order',
          },
        },
      },
    },
    // UNAUTHORIZED
    401: {
      description: 'Order does not belong to the paying user',
      content: {
        'application/json': {
          schema: {
            message:
              'You are not authorized to make this payment. This order does not belong to you',
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

export default addPayment;
