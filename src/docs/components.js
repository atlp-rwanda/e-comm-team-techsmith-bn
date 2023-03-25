const components = {

  schemas: {

    /**
         *  ID
         */

    id: {
      type: 'string',
      description: 'ID for different modals including products, users, orders, etc.',
      example: '60e1c7b0b9b5a8a0b4b0c1c1',
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
    }

  },

};

export default components;
