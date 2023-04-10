const createUser = {
  tags: ['Admin'],
  description: 'creating user by Admin',
  operationId: 'create user',

  // parameters
  parameters: [],

  // request boyd
  requestBody: {
    description: 'All data required to create a user',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/registerUser',
        },
      },
    },
  },

  // responses
  responses: {
    // user created
    201: {
      description: 'User Succesfully created',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/userCreated',
          },
        },
      },
    },

    // Bad request invalid email or password
    400: {
      description: 'Invalid email or password',
      content: {
        'application/json': {
          schema: {
            message: 'You provided invalid email or password',
          },
        },
      },
    },

    // user already exists
    409: {
      description: 'User already exists',
      content: {
        'application/json': {
          schema: {
            message: 'User already exists',
          },
        },
      },
    },

    // unauthorized
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

    // server error
    500: {
      description: 'Server error happened',
      content: {
        'application/json': {
          shema: {
            message: 'server error happend.. Please reload',
          },
        },
      },
    },
  },
};

export default createUser;
