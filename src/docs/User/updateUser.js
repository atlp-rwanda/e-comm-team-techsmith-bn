const updateUser = {
  tags: ['User'],
  description: 'Update user details',
  operationId: 'updateUser',

  // PARAMETERS
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'User ID to update',
      required: true,
      schema: {
        $ref: '#/components/schemas/id',
      },
    },
  ],

  // REQUEST BODY
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/registerUser',
        },
      },
    },
  },

  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'User updated successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/updatedUserResponse',
          },
        },
      },
    },
    // FORBIDDEN
    403: {
      description: 'User logged in but not authorized to update user details',
      content: {
        'application/json': {
          schema: {
            message: 'You can only update information about yourself',
          },
        },
      },
    },
    // UNAUTHORIZED
    401: {
      description: 'User not logged in',
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
      description: 'User submits unspupported data',
      content: {
        'application/json': {
          schema: {
            message: 'Invalid data',
          },
        },
      },
    },
  },
};

export default updateUser;
