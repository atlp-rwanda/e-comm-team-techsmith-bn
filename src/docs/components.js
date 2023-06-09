const components = {
  schemas: {
    /**
     * REUSABLE SCHEMAS
     */
    // ID
    id: {
      type: 'number',
      description:
        'ID for different modals including products, users, orders, roles,wishlist, etc.',
      example: 1,
    },
    // QUANTITY
    quantity: {
      type: 'number',
      description: 'quantity of products in the cart for the buyer',
      example: 4,
    },
    // PAGE
    page: {
      type: 'string',
      description: 'Page for data',
      example: '?page=3',
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
      description: 'Any string attribute',
      example: 'Name, Email, Noun, Text, Etc.',
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
    // PRICE
    price: {
      type: 'number',
      description: 'price of products',
      example: 4000,
    },
    // TOTAL PRICE
    totalPrice: {
      type: 'number',
      description:
        ' total price of a product containing more quantity in the cart',
      example: 10000,
    },

    // NUMBER
    number: {
      type: 'number',
      description: 'Any number attribute',
      example: 1,
    },

    // IMAGE
    image: {
      type: 'string',
      description: 'Image of products',
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
        sellerId: {
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
          example: `    "https://www.google.com/imgres?imgurl=https%3A%2F%2Fages.unsplash.png",
          "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.png",
          "https://www.google.com/imgres?imgurl=https%3A%2F%2ages.unsplash.png",
          "https://www.google.com/imgres?imgurl=https%3A%2FFimages.unsplash.png"`,
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
        // EXPITY DATE
        expiryDate: {
          type: 'string',
          description: 'Date when the product is going to expire',
          example: '2021-07-01T12:00:00.000Z',
        },
      },
    },
    updateProduct: {
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
      },
    },
    expirationResponse: {
      type: 'object',
      properties: {
        id: {
          $ref: '#components/schemas/id',
        },
        expiryDate: {
          type: 'string',
          description: 'Date when the product is going to expire',
          example: '2021-07-01T12:00:00.000Z',
        },
        userId: {
          $ref: '#components/schemas/id',
        },
        name: {
          $ref: '#/components/schemas/name',
        },
      },
    },

    // Search PRODUCT
    SearchProduct: {
      type: 'object',
      properties: {
        // NAME
        name: {
          type: 'string',
          nullable: true,
          description: 'word which can substring or name of  product',
          example: 'TV',
        },
        // CATEGORY ID
        categoryIds: {
          type: 'number',
          nullable: true,
          description: 'categoryID of  product',
          example: 4,
        },
        // PRICE
        price: {
          type: 'number',
          nullable: true,
          description: 'Price of the product',
          example: 720,
        },
      },
    },

    /**
     *  Search Product Reposne
     */
    SearchProductResponse: {
      type: 'object',
      properties: {
        data: [
          {
            id: 'b48e3b2c-60ee-48ae-a7bc-26d258f0e89b',
            userId: 16,
            categoryId: 4,
            name: 'TV SCREEN',
            image: [
              'https://www.google.com/imgres?imgurl=https%3A%2F%2Fages.unsplash.png',
              'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.png',
              'https://www.google.com/imgres?imgurl=https%3A%2F%2ages.unsplash.png',
              'https://www.google.com/imgres?imgurl=https%3A%2FFimages.unsplash.png',
            ],
            price: 300,
            condition: 'New',
            description: 'New Samsung csreen',
            expiryDate: '2023-04-06T17:30:00.000Z',
            createdAt: '2023-04-10T06:42:12.161Z',
            updatedAt: '2023-04-10T06:42:12.161Z',
          },
          {
            id: '408003ac-3782-4cd2-930f-3b6fd11c6274',
            userId: 16,
            categoryId: 4,
            name: 'productubfbsowlol',
            image: [
              'https://www.google.com/imgres?imgurl=https%3A%2F%2Fages.unsplash.png',
              'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.png',
              'https://www.google.com/imgres?imgurl=https%3A%2F%2ages.unsplash.png',
              'https://www.google.com/imgres?imgurl=https%3A%2FFimages.unsplash.png',
            ],
            price: 900,
            condition: 'New',
            description: 'New Samsung A23 released in 2022',
            expiryDate: '2023-04-06T17:30:00.000Z',
            createdAt: '2023-04-10T07:22:41.306Z',
            updatedAt: '2023-04-10T07:22:41.306Z',
          },
        ],
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

    // CREATING ORDER
    createOrder: {
      type: 'object',
      properties: {
        productId: {
          $ref: '#/components/schemas/id',
        },
        desiredQuantity: {
          type: 'number',
          description: 'quantity to be purchased',
          example: 2000,
        },
        amount: {
          type: 'number',
          description: 'Amount to be paid',
          example: 2000,
        },
      },
    },
    // UPDATING ORDER
    updateOrder: {
      type: 'object',
      properties: {
        quantity: {
          type: 'number',
          description: 'quantity to be purchased',
          example: 2000,
        },
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
    // WISHLIST RESPONSE
    wishlistResponse: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/components/schemas/id',
        },
        // PRODUCT ID
        productId: {
          $ref: '#/components/schemas/id',
        },
        // USER ID
        userId: {
          $ref: '#/components/schemas/id',
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
    // CART RESPONSE
    cartResponse: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/components/schemas/id',
        },
        // PRODUCT ID
        productId: {
          $ref: '#/components/schemas/id',
        },
        // USER ID
        userId: {
          $ref: '#/components/schemas/id',
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
    // UPDATE ITEMS
    updateItem: {
      type: 'object',
      properties: {
        desiredQuantity: {
          $ref: '#/components/schemas/quantity',
        },
      },
    },
    // VIEW CART
    retrieveResponse: {
      type: 'object',
      properties: {
        // PRODUCT NAME
        name: {
          $ref: '#/components/schemas/name',
        },
        quantity: {
          $ref: '#/components/schemas/quantity',
        },
        // PRICE
        price: {
          $ref: '#/components/schemas/price',
        },
        // IMAGE
        image: {
          $ref: '#/components/schemas/image',
        },
      },
    },
    // FEEDBACK BODY
    feedbackBody: {
      type: 'object',
      properties: {
        // RATING
        rating: {
          type: 'number',
          description: 'rating of the product',
          example: 4,
        },
        // FEEDBACK
        feedback: {
          type: 'string',
          description: 'Any string attribute',
          example: 'Your product is nice',
        },
      },
    },

    // FEEDBACK CREATION RESPONSE
    feedbackResponse: {
      type: 'object',
      properties: {
        // ID
        id: {
          $ref: '#/components/schemas/id',
        },
        // USER ID
        userId: {
          $ref: '#/components/schemas/id',
        },
        // PRODUCT ID
        productId: {
          $ref: '#/components/schemas/id',
        },
        // RATING
        rating: {
          type: 'number',
          description: 'rating of the product',
          example: 4,
        },
        // FEEDBACK
        feedback: {
          $ref: '#/components/schemas/string',
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

    // GETTING ALL FEEDBACK ON A PRODUCT
    getFeedbacks: {
      type: 'object',
      properties: {
        // ID
        id: {
          $ref: '#/components/schemas/id',
        },
        // RATING
        rating: {
          type: 'number',
          description: 'rating of the product',
          example: 4,
        },
        // FEEDBACK
        feedback: {
          $ref: '#/components/schemas/string',
        },
        // CREATED AT
        createdAt: {
          $ref: '#/components/schemas/createdAt',
        },
        // UPDATED AT
        updatedAt: {
          $ref: '#/components/schemas/updatedAt',
        },
        user: {
          name: { $ref: '#/components/schemas/string' },
        },
        product: {
          name: { $ref: '#/components/schemas/string' },
        },
      },
    },
    // GETTING ALL WISHLIST
    getAllWishlistResponse: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/components/schemas/id',
        },
        // PRODUCT ID
        productId: {
          $ref: '#/components/schemas/id',
        },
        // USER ID
        userId: {
          $ref: '#/components/schemas/id',
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

    // DELETING ALL WISHLIST
    deleteAllWishlistResponse: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/components/schemas/id',
        },
        // PRODUCT ID
        productId: {
          $ref: '#/components/schemas/id',
        },
        // USER ID
        userId: {
          $ref: '#/components/schemas/id',
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
    // CREATE PRODUCT AS AN ADMIN
    CreateProductAdmin: {
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
          example:
            '["https://www.google.com/imgres?imgurl=https%3A%2F%2Fages.unsplash.png","https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.png","https://www.google.com/imgres?imgurl=https%3A%2F%2ages.unsplash.png","https://www.google.com/imgres?imgurl=https%3A%2FFimages.unsplash.png]',
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
        sellerId: {
          type: 'number',
          description:
            'ID for the seller for which we are creating the product',
          example: 36,
        },
        // EXPITY DATE
        expiryDate: {
          type: 'string',
          description: 'Date when the product is going to expire',
          example: '2021-07-01T12:00:00.000Z',
        },
      },
    },
    sellerStats: {
      type: 'object',
      properties: {
        start: {
          type: 'string',
          example: '2023-04-10',
        },
        end: {
          type: 'string',
          example: '2023-04-30',
        },
      },
    },
    StatsResponse: {
      type: 'object',
      properties: {
        numOrders: {
          type: 'number',
        },
        totalRevenue: {
          type: 'number',
        },
        productSold: {
          type: 'number',
        },
        moneyMade: {
          type: 'number',
        },
        topSellingProduct: {
          type: 'object',
        },
      },
    },
    /**
     * NOTIFICATION
     */
    // NOTIFICATION RESPONSE
    notificationResponse: {
      type: 'object',
      properties: {
        // ID
        id: {
          $ref: '#/components/schemas/id',
        },
        // USER ID
        userId: {
          $ref: '#/components/schemas/id',
        },
        // STATUS
        status: {
          $ref: '#/components/schemas/number',
        },
        // TITLE
        title: {
          $ref: '#/components/schemas/string',
        },
        // BODY
        body: {
          $ref: '#/components/schemas/string',
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
  },
};
export default components;
