"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var deleteProductToWishlist = {
  tags: ['Wishlist'],
  description: 'deleting products in wishlist ',
  operationId: 'deleteProductToWishlist',
  // PARAMETERS
  parameters: [],
  // RESPONSES
  responses: {
    // SUCCESS
    200: {
      description: 'wishlist contents deleted successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/deleteAllWishlistResponse'
          }
        }
      }
    },
    // FORBIDDEN
    403: {
      description: 'User account not active',
      content: {
        'application/json': {
          schema: {
            message: 'Forbidden access, only buyers are allowed to perform this action'
          }
        }
      }
    },
    // SERVER ERROR
    500: {
      description: 'Failed to delete wishlist contents',
      content: {
        'application/json': {
          schema: {
            message: 'Internal server error'
          }
        }
      }
    }
  }
};
var _default = deleteProductToWishlist;
exports["default"] = _default;