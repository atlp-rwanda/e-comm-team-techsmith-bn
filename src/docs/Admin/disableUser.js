const disableUser = {
  tags: ['Admin'],
  description: 'Disable User',
  operationId: 'disableUser',

  // parameters:

  parameters: [
    {
      name: 'id',
      in: 'path',
      schema: {
        $ref: '#/components/schemas/id',
      },
      required: true,
      description: 'ID of the user to be disabled',
    },
  ],

  // request body

  requestBody: {},

  responses: {
    // success
    200: {
      desciption: 'Disable user successful',
      content: {
        'application/json': {
          schema: {
            message: 'Account was successfully disabled',
          },
        },
      },
    },

    // not found
    404: {
      description: 'Failed to disable user',
      content: {
        'application/json': {
          schema: {
            message: 'User not found',
          },
        },
      },
    },

    // unauthorized
    401: {
      desciption: 'Unauthorized to perform the action',
      content: {
        'application/json': {
          schema: {
            message: 'Login first to perform this action',
          },
        },
      },
    },

    // server error
    500: {
      description: 'Internal server error',
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

export default disableUser;
