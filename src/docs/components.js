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
        // ISACTIVE
        isActive: {
          type: 'boolean',
          description: 'Status of the user account',
          example: true,
        },
        birthDate: {
          type: 'string',
          description: 'Birth date of the user',
          example: '2021-07-01T12:00:00.000Z',
        },
        // PREFERRED LANGUAGE
        preferredLanguage: {
          type: 'string',
          description: 'Preferred language of the user',
          example: 'en, rw, fr, etc..',
        },
        // PREFERRED CURRENCY
        preferredCurrency: {
          type: 'string',
          description: 'Preferred currency of the user',
          example: 'RWF, USD, EUR, etc..',
        },
        // PHYSICAL ADDRESS
        physicalAddress: {
          type: 'string',
          description: 'Physical address of the user',
          example: 'Kigali, Rwanda',
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
        // ISACTIVE
        isActive: {
          type: 'boolean',
          description: 'Status of the user account',
          example: true,
        },
        // TOKEN
        Authorization: {
          $ref: '#/components/schemas/token',
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
        // BIRTH DATE
        birthDate: {
          type: 'string',
          description: 'Birth date of the user',
          example: '2021-07-01T12:00:00.000Z',
        },
        // PREFERRED LANGUAGE
        preferredLanguage: {
          type: 'string',
          description: 'Preferred language of the user',
          example: 'en, rw, fr, etc..',
        },
        // PREFERRED CURRENCY
        preferredCurrency: {
          type: 'string',
          description: 'Preferred currency of the user',
          example: 'RWF, USD, EUR, etc..',
        },
        // PHYSICAL ADDRESS
        physicalAddress: {
          type: 'string',
          description: 'Physical address of the user',
          example: 'Kigali, Rwanda',
        },
        // ROLE
        role: {
          $ref: '#/components/schemas/id',
        },
      },
    },
    // LOGIN USER
    loginUser: {
      type: 'object',
      properties: {
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
      },
    },
    // REQUEST SUBSCRIPTION
    requestSubscription: {
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
      },
    },
    // REQUEST SUBSCRIPTION RESPONSE
    requestSubscriptionResponse: {
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
          $ref: '#/components/schemas/email',
        },
        // ISSUBSCRIBED
        isSubscribed: {
          type: 'boolean',
          description:
            'Status of the subscription, always false until a user confirms their subscription via email',
          example: false,
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
  },
};

export default components;
