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
    // STRING
    string: {
      type: 'string',
      description: 'Any sting attribute',
      example: 'description, condition, name, place, etc.',
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
    // PRODUCT RESPONSE
    ProductResponse: {
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
        // IMAGE
        image: {
          type: 'array',
          description: 'Minimum of 4 images, Maximum of 8 images',
          example: 'https://images.unsplash.com/photo-',
        },
        // CONDITION
        condition: {
          $ref: '#/components/schemas/string',
        },
        // PRICE
        price: {
          type: 'number',
          description: 'Price of the product',
          example: 720,
        },
        // DESCRIPTION
        description: {
          $ref: '#/components/schemas/string',
        },
        userId: {
          $ref: '#components/schemas/id',
        },
        // EXPITY DATE
        expiryDate: {
          type: 'string',
          description: 'Date when the product is going to expire',
          example: '2021-07-01T12:00:00.000Z',
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
    // CREATE PRODUCT
    CreateProduct: {
      type: 'object',
      properties: {
        // NAME
        name: {
          $ref: '#/components/schemas/name',
        },
        // IMAGE
        image: {
          type: 'array',
          description: 'Minimum of 4 images, Maximum of 8 images',
          example: 'https://images.unsplash.com/photo-',
        },
        // CONDITION
        condition: {
          $ref: '#/components/schemas/string',
        },
        // CATEGORY ID
        categoryId: { $ref: '#/components/schemas/id' },
        // PRICE
        price: {
          type: 'number',
          description: 'Price of the product',
          example: 720,
        },
        // DESCRIPTION
        description: {
          $ref: '#/components/schemas/string',
        },
        userId: {
          $ref: '#components/schemas/id',
        },
        // EXPITY DATE
        expiryDate: {
          type: 'string',
          description: 'Date when the product is going to expire',
          example: '2021-07-01T12:00:00.000Z',
        },
      },
    },

    // create user response
    userCreated: {
      type: 'object',
      properties: {
        newUser: {
          $red: '#/components/schemas/UserRegistered',
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
    // SELLER LOGGED IN
    SellerLoggedIn: {
      type: 'object',
      properties: {
        // MESSAGE
        message: {
          $ref: '#/components/schemas/string',
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
        googleId: {
          type: 'string',
          description: 'Google ID of the user',
          example: '123456789',
        },
        gender: {
          type: 'string',
          description: 'gender of the user',
          example: 'female',
        },
      },
    },
    // REGISTERED USER
    UserRegistered: {
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
        googleId: {
          type: 'string',
          description: 'Google ID of the user',
          example: '123456789',
        },
        gender: {
          type: 'string',
          description: 'gender of the user',
          example: 'female',
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

    /**
     *  ORDER
     */
    Order: {
      type: 'object',
      properties: {
        data: [
          {
            id: 1002,
            productId: 20101,
            userId: 6100,
            status: 'payment received',
            quantity: 10,
            amount: 200000,
            createdAt: '2023-04-05T12:28:00.571Z',
            updatedAt: '2023-04-05T12:28:00.571Z',
          },
          {
            id: 1003,
            productId: 20201,
            userId: 6300,
            status: 'payment failed',
            quantity: 35,
            amount: 140000,
            createdAt: '2023-04-05T12:28:00.571Z',
            updatedAt: '2023-04-05T12:28:00.571Z',
          },
          {
            id: 1001,
            productId: 2001,
            userId: 20,
            status: 'new',
            quantity: 12,
            amount: 72000,
            createdAt: '2023-04-05T12:28:00.571Z',
            updatedAt: '2023-04-05T12:28:00.571Z',
          },
        ],
      },
    },
    /**
     * PAYMENT
     */
    // PAYMENT RESPONSE
    PaymentReponse: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/components/schemas/id',
        },
        // ORDER ID
        orderId: {
          $ref: '#/components/schemas/id',
        },
        // USER ID
        userId: {
          $ref: '#/components/schemas/id',
        },
        // RECEIPT URL
        receiptUrl: {
          type: 'string',
          description: 'Receipt URL of the payment',
          example: 'https://paystack.com/receipts/123456789',
        },
        // CREATED AT
        createdAt: {
          $ref: '#/components/schemas/createdAt',
        },
        // UPDATED AT
        updatedAt: {
          $ref: '#/components/schemas/updatedAt',
        },
      },
    },
    /**
     *  UPDATED USER
     */
    // UPDATED USER RESPONSE
    updatedUserResponse: {
      type: 'object',
      properties: {
        // MESSAGE
        message: {
          $ref: '#/components/schemas/string',
        },
        // UPDATED USER DATA
        updatedUser: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
    // PAYMENT REQUEST
    PaymentRequest: {
      type: 'object',
      properties: {
        // CARD
        card: {
          type: 'object',
          properties: {
            number: {
              type: 'integer',
              description:
                'Card number. Use the example provided (Stripe testing card) for testing purposes.',
              example: 4242424242424242,
            },
            // EXPIRY MONTH
            exp_month: {
              type: 'number',
              description:
                'Card expiry month. Use any month of your choice for testing',
              example: 12,
            },
            // EXPIRY YEAR
            exp_year: {
              type: 'number',
              description: 'Card expiry year. Choose any year from the feature',
              example: 2028,
            },
            // CVC
            cvc: {
              type: 'number',
              description: 'Card security code. Enter any three digits',
              example: 212,
            },
          },
        },
      },
    },
  },
};

export default components;
