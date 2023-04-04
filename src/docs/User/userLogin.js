const loginUser = {
  tags: ['User'],
  description: 'Login a user',
  operationId: 'loginUser',

  // PARAMETERS
  parameters: [],

  // REQUEST BODY
  requestBody: {
    description: 'A route to authenticate a user and return a token',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/loginUser',
        },
      },
    },
  },

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'User logged in successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserLoggedIn',
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
            message: 'Email or password not valid',
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
            message: 'Server error',
          },
        },
      },
    },
  },
};

export default loginUser;
