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
    // SELLER LOGIN
    202: {
      description:
        'Sellers are required to complete 2FA before they can log into their accounts',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SellerLoggedIn',
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

const twoFactorAuthentication = {
  tags: ['User'],
  description: 'Completing two factor authentication for sellers',
  operationId: 'twoFactorAuthentication',

  // PARAMETERS
  parameters: [
    {
      name: 'token',
      in: 'path',
      description: 'Token sent to seller email using nodemailer',
      required: true,
      schema: {
        $ref: '#/components/schemas/token',
      },
    },
  ],

  // REQUEST BODY
  requestBody: {},

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
    // SELLER LOGIN
    202: {
      description:
        'Sellers are required to complete 2FA before they can log into their accounts',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SellerLoggedIn',
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

export { loginUser, twoFactorAuthentication };
