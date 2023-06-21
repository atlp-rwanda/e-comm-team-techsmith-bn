"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var sellerStats = {
  // DEFINITION
  tags: ['Statistics'],
  // REQUIRED
  description: 'Get Statistics for Seller',
  // REQUIRED
  operationId: 'sellerStats',
  // REQUIRED

  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {
    description: 'Statistics periods',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/sellerStats'
        }
      }
    }
  },
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Stats were obtained',
      // REQUIRED
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/StatsResponse'
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
var _default = sellerStats;
exports["default"] = _default;