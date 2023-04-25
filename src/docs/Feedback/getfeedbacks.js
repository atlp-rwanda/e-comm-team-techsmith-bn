const getFeedback = {
  // DEFINITION
  tags: ['Feedback'], // REQUIRED
  description: 'Get product feedback', // REQUIRED
  operationId: 'feedbacks', // REQUIRED

  // PARAMETERS
  parameters: [
    {
      name: 'cookie',
      in: 'header',
      schema: {
        type: 'string',
        description: 'Token as generated by Postman',
      },
      required: true,
    },
    {
      name: 'pId',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/id',
      },
      required: true,
      description: 'ID of the product ',
    },
  ],

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Feedback successfully fetched',
      content: {
        'application/json': {
          schema: {
            message: 'Feedback successfully fetched',
          },
        },
      },
    },
    // not found
    404: {
      description: 'Feedbacks not fetched',
      content: {
        'application/json': {
          schema: {
            message: 'Feedbacks not fetched',
          },
        },
      },
    },
    // UNAUTHORIZED
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action',
          },
        },
      },
    },
    // BAD REQUEST
    400: {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            message: 'Bad request',
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

export default getFeedback;
