"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readSingle = exports.readAll = exports.getUnread = exports.getAll = exports.deleteSingle = void 0;
// GET ALL NOTIFICATIONS
var getAll = {
  tags: ['Notification'],
  description: 'Get all notifications for a user',
  operationId: 'getAllNotifications',
  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCESS
    200: {
      description: 'Notifications retrieved successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/notificationResponse'
          }
        }
      }
    },
    // UNAUTHORIZED
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action. Please make sure you are logged in'
          }
        }
      }
    },
    // FORBIDDEN
    403: {
      description: 'Forbidden to perform this action',
      content: {
        'application/json': {
          schema: {
            message: 'You are not allowed to perform this action. Only sellers can interact with notifications'
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
            message: 'Internal server error'
          }
        }
      }
    }
  }
};

// GET UNREAD NOTIFICATIONS
exports.getAll = getAll;
var getUnread = {
  tags: ['Notification'],
  description: 'Get all unread notifications for a user',
  operationId: 'getUnreadNotifications',
  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCESS
    200: {
      description: 'Unread notifications retrieved successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/notificationResponse'
          }
        }
      }
    },
    // UNAUTHORIZED
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action. Please make sure you are logged in'
          }
        }
      }
    },
    // FORBIDDEN
    403: {
      description: 'Forbidden to perform this action',
      content: {
        'application/json': {
          schema: {
            message: 'You are not allowed to perform this action. Only sellers can interact with notifications'
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
            message: 'Internal server error'
          }
        }
      }
    }
  }
};

// READ ALL NOTIFICATIONS
exports.getUnread = getUnread;
var readAll = {
  tags: ['Notification'],
  description: 'Read all notifications for a user',
  operationId: 'readAllNotifications',
  // PARAMETERS
  parameters: [],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCESS
    200: {
      description: 'You have cleared all notifications',
      content: {
        'application/json': {
          schema: {
            message: 'You are all caught up',
            data: '#/components/schemas/notificationResponse'
          }
        }
      }
    },
    // UNAUTHORIZED
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action. Please make sure you are logged in'
          }
        }
      }
    },
    // FORBIDDEN
    403: {
      description: 'Forbidden to perform this action',
      content: {
        'application/json': {
          schema: {
            message: 'You are not allowed to perform this action. Only sellers can interact with notifications'
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
            message: 'Internal server error'
          }
        }
      }
    }
  }
};

// READ SINGLE NOTIFICATION
exports.readAll = readAll;
var readSingle = {
  tags: ['Notification'],
  description: 'Read a single notification for a user',
  operationId: 'readSingleNotification',
  // PARAMETERS
  parameters: [{
    name: 'id',
    "in": 'path',
    description: 'Notification ID to be marked as read',
    required: true
  }],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCESS
    200: {
      description: 'Notification read successfully',
      content: {
        'application/json': {
          schema: {
            message: 'Notification read successfully',
            data: '#/components/schemas/notificationResponse'
          }
        }
      }
    },
    // NOTIFICATION NOT FOUND
    404: {
      description: 'Notification not found',
      content: {
        'application/json': {
          schema: {
            message: 'Notification not found'
          }
        }
      }
    },
    // UNAUTHORIZED
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action. Please make sure you are logged in'
          }
        }
      }
    },
    // FORBIDDEN
    403: {
      description: 'Forbidden to perform this action',
      content: {
        'application/json': {
          schema: {
            message: 'You are not allowed to perform this action. Only sellers can interact with notifications'
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
            message: 'Internal server error'
          }
        }
      }
    }
  }
};

// DELETE NOTIFICATION
exports.readSingle = readSingle;
var deleteSingle = {
  tags: ['Notification'],
  description: 'Delete a single notification for a user',
  operationId: 'deleteSingleNotification',
  // PARAMETERS
  parameters: [{
    name: 'id',
    "in": 'path',
    description: 'Notification ID to be deleted'
  }],
  // REQUEST BODY
  requestBody: {},
  // RESPONSES
  responses: {
    // SUCESS
    200: {
      description: 'Notification deleted successfully',
      content: {
        'application/json': {
          schema: {
            message: 'Notification deleted successfully'
          }
        }
      }
    },
    // NOTIFICATION NOT FOUND
    404: {
      description: 'Notification not found',
      content: {
        'application/json': {
          schema: {
            message: "Notification not found and can't be deleted"
          }
        }
      }
    },
    // UNAUTHORIZED
    401: {
      description: 'Unauthorized',
      content: {
        'application/json': {
          schema: {
            message: 'You are not authorized to perform this action. Please make sure you are logged in'
          }
        }
      }
    },
    // FORBIDDEN
    403: {
      description: 'Forbidden to perform this action',
      content: {
        'application/json': {
          schema: {
            message: 'You are not allowed to perform this action. Only sellers can interact with notifications'
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
            message: 'Internal server error'
          }
        }
      }
    }
  }
};
exports.deleteSingle = deleteSingle;