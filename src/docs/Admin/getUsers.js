const getUsers = {
  tags: ['Admin'],
  description: 'Getting all users Avalible in the database',
  operationId: 'getusers',

  // parameters
  parameters: [],

  // request body
  requestBody: {},

  responses: {
    200: {
      description: 'All users were found',
      content: {
        'application/json': {
          schema: {
            message: 'All users found successfully',
          },
        },
      },
    },

    500: {
      description: 'Server Error',
      content: {
        'application/json': {
          schema: {
            message: 'Server Erro happend. Please reload!',
          },
        },
      },
    },
  },
};

export default getUsers;
