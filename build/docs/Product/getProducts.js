"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProducts = exports.getProductById = exports.getOneFromMine = void 0;
var getProducts = {
  // DEFINITION
  tags: ['Product'],
  // REQUIRED
  description: 'Get all products',
  // REQUIRED
  operationId: 'allProducts',
  // REQUIRED

  // PARAMETERS
  parameters: [{
    name: 'page',
    "in": 'query',
    description: 'Page number',
    required: true,
    schema: {
      type: 'integer'
    }
  }, {
    name: 'size',
    "in": 'query',
    description: 'Number of items per page',
    required: false,
    schema: {
      type: 'integer',
      "default": 20
    }
  }],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Products were obtained',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductResponse'
          }
        } // REQUIRED
      } // REQUIRED
    },

    // ERROR
    500: {
      description: 'Server error',
      // REQUIRED
      content: {
        'application/json': {
          schema: {} // EMPTY SCHEMA
        } // REQUIRED
      } // REQUIRED
    }
  } // REQUIRED
};
exports.getProducts = getProducts;
var getProductById = {
  // DEFINITION
  tags: ['Product'],
  // REQUIRED
  description: 'Buyer Get product by Id',
  // REQUIRED
  operationId: 'One product',
  // REQUIRED

  // PARAMETERS
  parameters: [{
    name: 'id',
    "in": 'path',
    description: 'id of required product',
    required: true,
    schema: {
      $ref: '#/components/schemas/id'
    }
  }],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Product found',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductResponse'
          }
        } // REQUIRED
      } // REQUIRED
    },

    // ERROR
    500: {
      description: 'Server error',
      // REQUIRED
      content: {
        'application/json': {
          schema: {} // EMPTY SCHEMA
        } // REQUIRED
      } // REQUIRED
    }
  } // REQUIRED
};
exports.getProductById = getProductById;
var getOneFromMine = {
  // DEFINITION
  tags: ['Product'],
  // REQUIRED
  description: 'Seller get single product',
  // REQUIRED
  operationId: 'one product',
  // REQUIRED

  // PARAMETERS
  parameters: [{
    name: 'id',
    "in": 'path',
    description: 'id',
    required: true,
    schema: {
      $ref: '#/components/schemas/id'
    }
  }],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'The product retrieved successfully',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/ProductResponse'
          }
        } // REQUIRED
      } // REQUIRED
    },

    404: {
      description: 'Failure',
      content: {
        'application/json': {
          schema: {
            message: 'The product is not available '
          }
        }
      }
    },
    // ERROR
    500: {
      description: 'Server error',
      // REQUIRED
      content: {
        'application/json': {
          schema: {} // EMPTY SCHEMA
        } // REQUIRED
      } // REQUIRED
    }
  } // REQUIRED
};
exports.getOneFromMine = getOneFromMine;