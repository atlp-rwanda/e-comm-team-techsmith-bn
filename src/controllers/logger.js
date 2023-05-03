const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.printf(
    ({ level, message, timestamp }) =>
      `${timestamp} [${level.toUpperCase()}]: ${message}`
  )
);

// PRODUCT LOGS
const productLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'Logs/product.logs',
      format: customFormat,
    }),
  ],
});

const cartLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'Logs/cart.logs',
      format: customFormat,
    }),
  ],
});

const orderLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'Logs/order.logs',
      format: customFormat,
    }),
  ],
});

// USER LOGS
const userLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'Logs/user.logs',
      format: customFormat,
    }),
  ],
});

const feedbackLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'Logs/feedback.logs',
      format: customFormat,
    }),
  ],
});
const paymentLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'Logs/payment.logs',
      format: customFormat,
    }),
  ],
});

const databaseLogger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      filename: 'Logs/database.logs',
      format: customFormat,
    }),
  ],
});

module.exports = {
  userLogger,
  productLogger,
  cartLogger,
  orderLogger,
  feedbackLogger,
  paymentLogger,
  databaseLogger,
};
