const logoutUser = {
  tags: ['User'],
  description: 'Route to sign out the user',
  operationId: 'logoutUser',

  // PARAMETERS
  parameters: [
    {
      name: 'Authorization token',
      in: 'header',
      schema: {
        type: String,
        description: 'Token issued after successful authentication',
      },
    },
  ],

  // REQUEST BODY
  requestBody: {},

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'User logged out successfully',
      content: {
        'application/json': {
          schema: {
            success: true,
            message: 'You have logged out succesfully! See you soon',
          },
        },
      },
    },
    // UNAUTHORIZED
    401: {
      description: 'When a user is not logged in',
      content: {
        'application/json': {
          schema: {
            message: 'You are not logged in!',
          },
        },
      },
    },
    // SERVER ERROR
    500: {
      description: 'Internal server error',
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

export default logoutUser;
