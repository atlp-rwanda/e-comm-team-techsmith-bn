"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var getAProduct = {
  // DEFINITION
  tags: ['Admin'],
  // REQUIRED
  description: 'Get all products',
  // REQUIRED
  operationId: 'allProducts',
  // REQUIRED

  // PARAMETERS
  parameters: [{
    name: 'id',
    "in": 'path',
    schema: {
      $ref: '#/components/schemas/id'
    },
    required: true,
    description: 'ID of the product'
  }],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Products is obtained',
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
var _default = getAProduct;
exports["default"] = _default;