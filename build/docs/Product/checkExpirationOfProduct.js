"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var checkexpiration = {
  tags: ['Product'],
  description: 'Removing expired product from the available product list ',
  operationId: 'checkExpiration',
  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'Product expiration check completed',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/expirationResponse'
          }
        }
      }
    },
    // SERVER ERROR
    500: {
      description: 'Server error',
      content: {
        'application/json': {
          schema: {
            message: 'Getting product failure'
          }
        }
      }
    }
  }
};
var _default = checkexpiration;
exports["default"] = _default;