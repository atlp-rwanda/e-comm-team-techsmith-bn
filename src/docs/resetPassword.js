const requestReset = {
  tags: ['User'],
  description: 'Request password reset email',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              description:
                'The email of the user whose password needs to be reset',
              example: 'example@example.com',
            },
          },
          required: ['email'],
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Success message',
                example: 'Password reset email sent successfully',
              },
            },
          },
        },
      },
    },
    400: {
      description: 'Bad Request',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Error message',
                example: 'Invalid email address',
              },
            },
          },
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Error message',
                example: 'Server error occurred',
              },
            },
          },
        },
      },
    },
  },
};

const passwordReset = {
  tags: ['User'],
  description: 'Reset password with token',
  parameters: [
    {
      name: 'token',
      in: 'path',
      required: true,
      description: 'Reset password token received via email',
      schema: {
        type: 'string',
      },
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            password: {
              type: 'string',
              description: 'New password for the user',
            },
          },
          required: ['password'],
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Success message',
                example: 'Password reset successful',
              },
            },
          },
        },
      },
    },

    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Error message',
                example: 'Invalid or expired token',
              },
            },
          },
        },
      },
    },
    500: {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Error message',
                example: 'Server error occurred',
              },
            },
          },
        },
      },
    },
  },
};
export { requestReset, passwordReset };
