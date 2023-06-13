"use strict";

var _require = require('winston'),
  createLogger = _require.createLogger,
  format = _require.format,
  transports = _require.transports;
var customFormat = format.combine(format.timestamp(), format.errors({
  stack: true
}), format.printf(function (_ref) {
  var level = _ref.level,
    message = _ref.message,
    timestamp = _ref.timestamp;
  return "".concat(timestamp, " [").concat(level.toUpperCase(), "]: ").concat(message);
}));

// PRODUCT LOGS
var productLogger = createLogger({
  exitOnError: false,
  transports: [new transports.File({
    filename: 'Logs/product.logs',
    format: customFormat
  })]
});
var cartLogger = createLogger({
  exitOnError: false,
  transports: [new transports.File({
    filename: 'Logs/cart.logs',
    format: customFormat
  })]
});
var orderLogger = createLogger({
  exitOnError: false,
  transports: [new transports.File({
    filename: 'Logs/order.logs',
    format: customFormat
  })]
});

// USER LOGS
var userLogger = createLogger({
  exitOnError: false,
  transports: [new transports.File({
    filename: 'Logs/user.logs',
    format: customFormat
  })]
});
var feedbackLogger = createLogger({
  exitOnError: false,
  transports: [new transports.File({
    filename: 'Logs/feedback.logs',
    format: customFormat
  })]
});
var paymentLogger = createLogger({
  exitOnError: false,
  transports: [new transports.File({
    filename: 'Logs/payment.logs',
    format: customFormat
  })]
});
var databaseLogger = createLogger({
  exitOnError: false,
  transports: [new transports.File({
    filename: 'Logs/database.logs',
    format: customFormat
  })]
});
module.exports = {
  userLogger: userLogger,
  productLogger: productLogger,
  cartLogger: cartLogger,
  orderLogger: orderLogger,
  feedbackLogger: feedbackLogger,
  paymentLogger: paymentLogger,
  databaseLogger: databaseLogger
};