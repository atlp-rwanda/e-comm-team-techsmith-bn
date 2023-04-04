const components = {
  schemas: {
    /**
     * REUSABLE SCHEMAS
     */
    // ID
    id: {
      type: 'number',
      description:
        'ID for different modals including products, users, orders, roles, etc.',
      example: 1,
    },
    // TOKEN
    token: {
      type: 'string',
      description: 'Token for authorization',
      example:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Im5pc2hpbXdlc3dhZ2dlcmFnYWluQGdtYWlsLmNvbSIsImlhdCI6MTY4MDI1Mzc1MiwiZXhwIjoxNjgwODU4NTUyfQ.2jVpZ8XB_3ra4vukc8NkdI2aZcTiEoJIzheAsA-fM5U',
    },
    // NAME
    name: {
      type: 'string',
      description:
        'Name of models used in the application, including user, product, category, etc.',
      example: 'iPhone 12, John Doe, etc.',
    },
    // EMAIL
    email: {
      type: 'string',
      description: 'Email of users',
      example: 'atlp@gmail.com',
    },
    // CREATEDAT
    createdAt: {
      type: 'string',
      description: 'Date when the model was created',
      example: '2021-07-01T12:00:00.000Z',
    },
    // UPDATEDAT
    updatedAt: {
      type: 'string',
      description: 'Date when the model was last updated',
      example: '2021-07-01T12:00:00.000Z',
    },

    /**
     *  PRODUCT
     */

    Product: {
      type: 'object',
      properties: {
        // ID
        _id: {
          $ref: '#/components/schemas/id',
        },

        // NAME
        name: {
          type: 'string',
          description: 'Name of the product',
          example: 'iPhone 12',
        },

        // IMAGE
        image: {
          type: 'string',
          description: 'Image of the product',
          example: 'https://images.unsplash.com/photo-',
        },

        // CREATEDAT
        createdAt: {
          type: 'string',
          description: 'Date when the product was created',
          example: '2021-07-01T12:00:00.000Z',
        },

        // VERSION
        __v: {
          type: 'number',
          description: 'Version of the product',
          example: 0,
        },
      },
    },

    /**
     * USER
     */

    // USER REGISTERED RESPONSE
    UserRegistered: {
      type: 'object',
      properties: {
        // ID
        id: {
          $ref: '#/components/schemas/id',
        },
        // NAME
        name: {
          $ref: '#/components/schemas/name',
        },
        // EMAIL
        email: {
          type: 'string',
          description: 'Email of the user',
          example: 'atlp@gmail.com',
        },
        // ROLE
        roleId: {
          $ref: '#/components/schemas/id',
        },
        // CREATEDAT
        createdAt: {
          $ref: '#/components/schemas/createdAt',
        },
        // UPDATEDAT
        updatedAt: {
          $ref: '#/components/schemas/updatedAt',
        },
      },
    },
    // USER LOGIN RESPONSE
    UserLoggedIn: {
      type: 'object',
      properties: {
        // ID
        id: {
          $ref: '#/components/schemas/id',
        },
        // NAME
        name: {
          $ref: '#/components/schemas/name',
        },
        email: {
          $ref: '#/components/schemas/email',
        },
        // ROLE
        roleId: {
          $ref: '#/components/schemas/id',
        },
        // TOKEN
        token: {
          $ref: '#/components/schemas/token',
        },
      },
    },
    // REGISTER USER
    registerUser: {
      type: 'object',
      properties: {
        // NAME
        name: {
          $ref: '#/components/schemas/name',
        },
        // EMAIL
        email: {
          $ref: '#/components/schemas/email',
        },
        // PASSWORD
        password: {
          type: 'string',
          description: 'Password of the user',
          example: 'abc123456',
        },
        // ROLE
        role: {
          $ref: '#/components/schemas/id',
        },
      },
    },
  },
};

export default components;
