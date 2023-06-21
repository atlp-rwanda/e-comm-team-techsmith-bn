"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.twoFAMessageTemplate = exports.sendEmail = exports.resetPasswordMessageTemplate = exports.registerMessageTemplate = exports.productIsExpired = exports.paymentSuccessfulMessage = exports.nodeMail = exports.newsletterSubscriptionMessageTemplate = exports.enableUserMessageTemplate = exports.disableUserMessageTemplate = exports.deliveredOrderMessage = exports.cancelledOrderMessage = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mail = _interopRequireDefault(require("@sendgrid/mail"));
var _nodemailer = _interopRequireDefault(require("nodemailer"));
// CONFIGURE DOTENV
_dotenv["default"].config();

// LOAD ENV VARIABLES
var _process$env = process.env,
  NODEMAILER_EMAIL_USERNAME = _process$env.NODEMAILER_EMAIL_USERNAME,
  NODEMAILER_EMAIL_PASSWORD = _process$env.NODEMAILER_EMAIL_PASSWORD,
  PORT = _process$env.PORT;

// CONFIGURE HOST
var host = process.env.NODE_ENV === 'production' ? process.env.HOST : "http://localhost:".concat(PORT);
_mail["default"].setApiKey(process.env.SENDGRID_API_KEY);

// MESSAGE TEMPLATES
// REGISTER MESSAGE TEMPLATE
var registerMessageTemplate = function registerMessageTemplate(name) {
  return "\nDear ".concat(name, ",\nYou have successfully registered on our platform. We are glad to have you on board.\nBelow is the link to our platform. You can login with your email and password.\n").concat(host, "/users/login\nThank you for using our service.\n");
};

/* RESET PASSWORD MESSAGE TEMPLATE */
exports.registerMessageTemplate = registerMessageTemplate;
var resetPasswordMessageTemplate = function resetPasswordMessageTemplate(name, token) {
  return "\nDear ".concat(name, ",\nYou have requested to reset your password. Please click on the link below to reset your password.\n").concat(host, "/api/users/reset-password/").concat(token, "\nIf you did not request for a password reset, please contact our support team.\nThank you.\n");
};

/* NEWSLETTER SUBSCRIPTION MESSAGE TEMPLATE */
exports.resetPasswordMessageTemplate = resetPasswordMessageTemplate;
var newsletterSubscriptionMessageTemplate = function newsletterSubscriptionMessageTemplate(name, token) {
  return "\nDear ".concat(name, ",\nYou have registered for our newsletter. To make sure it is you, please click on the link below to confirm your subscription.\n").concat(host, "/api/users/confirm-newsletter/").concat(token, "\nIf you did not request for a newsletter subscription, kindly ignore this email.\nThank you.\n");
};

/* TWO FACTOR AUTHENTICATION MESSAGE TEMPLATE */
exports.newsletterSubscriptionMessageTemplate = newsletterSubscriptionMessageTemplate;
var twoFAMessageTemplate = function twoFAMessageTemplate(name, token) {
  return "\nDear ".concat(name, ",\nYou have requested to enable two factor authentication on your account. please use the token below to confirm your identity.\n").concat(token, "   \nCopy and paste the token above to the input field on the page.\nIf you did not request for two factor authentication, please contact our support team.\nThank you.\n");
};

/* SENDGRID EMAIL */
// disable user MESSAGE TEMPLATE
exports.twoFAMessageTemplate = twoFAMessageTemplate;
var disableUserMessageTemplate = function disableUserMessageTemplate(name) {
  return "\nDear ".concat(name, ",\nWe are sorry to inform you that your account has been temporarily disabled. This may\nbe caused by improper conduct or other illegal transactions performed under your name.\nIf you believe that this is a mistake, kindly reach out to the site admin.\nThank you.\n");
};

// disable user MESSAGE TEMPLATE
exports.disableUserMessageTemplate = disableUserMessageTemplate;
var enableUserMessageTemplate = function enableUserMessageTemplate(name) {
  return "\nDear ".concat(name, ",\nWe are happy to inform you that your account has been enabled again. Make sure to\nabide with proper conduct or avoid illegal transactions performed under your account name.\nIf you believe that this is a mistake, kindly ignore this message.\nFollow this link to know mow:\nhttps://smithT/linkToContactUs\nThank you.\n");
};
exports.enableUserMessageTemplate = enableUserMessageTemplate;
var productIsExpired = function productIsExpired(name, productName) {
  return "\nSubject: Regarding Expired Product - ".concat(productName, "\n\nDear ").concat(name, ",\n\nI hope this email finds you well. We wanted to bring to your attention that the ").concat(productName, " you have provided to us for our app has expired.\n\nAs part of our quality assurance process, we ensure that all products used in our app are within their designated shelf life to maintain the highest standards for our users. However, the ").concat(productName, " we received from you has exceeded its expiration date.\n\nWe kindly request your assistance in providing us with an updated version of the ").concat(productName, " that is within its expiration date. This will allow us to continue providing our users with a seamless experience and maintain the integrity of our app.\n\nWe appreciate your attention to this matter and your cooperation in resolving this issue. Thank you for your prompt response.\n\nBest regards,\n");
};

// DELIVERED ORDER MESSAGE TEMPLATE
exports.productIsExpired = productIsExpired;
var deliveredOrderMessage = function deliveredOrderMessage(name) {
  return "\nDear ".concat(name, ",\nWe are please to inform you that your order is being delivered. You may expect to see it\nbetwee two to three business days. We really appreciate your patience.\n\nThank you for choosing SMITH-t-ECOMMERCE\n");
};

// CANCELLED ORDER MESSAGE TEMPLATE
exports.deliveredOrderMessage = deliveredOrderMessage;
var cancelledOrderMessage = function cancelledOrderMessage(name) {
  return "\nDear ".concat(name, ",\nWe are we regret to inform you that your order was cancelled. This may be \ndue to one of various reasons. We advise you to contact our team\nfor further inquires. We really appreciate your patience.\n\nThank you for choosing SMITH-t-ECOMMERCE\n");
};

// PAYMENT SUCCESSFUL MESSAGE TEMPLATE
exports.cancelledOrderMessage = cancelledOrderMessage;
var paymentSuccessfulMessage = function paymentSuccessfulMessage(name, receipt) {
  return "\nDear ".concat(name, ",\n  \nWe are happy to inform you that your payment was successful, and your order is already en route to your address. You may expect to see it between two to three business days. We really appreciate your patience.\n  \nYou may access your receipt on the link below:\n  ").concat(receipt, "\n  \nThank you for choosing Techsmiths Ecommerce\n  ");
};

/* SENDGRID EMAIL */
exports.paymentSuccessfulMessage = paymentSuccessfulMessage;
var sendEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email, name, heading, messageTemplate, token) {
    var message;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          message = {
            to: email,
            from: process.env.SENDGRID_EMAIL,
            subject: heading,
            text: messageTemplate(name, token)
          }; // SEND EMAIL
          _context.next = 4;
          return _mail["default"].send(message);
        case 4:
          _context.next = 9;
          break;
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return function sendEmail(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

/* NODEMAILER */
exports.sendEmail = sendEmail;
var nodeMail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(email, name, heading, messageTemplate, token) {
    var message, transporter, mailOptions;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          message = messageTemplate(name, token);
          transporter = _nodemailer["default"].createTransport({
            service: 'hotmail',
            auth: {
              user: NODEMAILER_EMAIL_USERNAME,
              pass: NODEMAILER_EMAIL_PASSWORD
            }
          }); // SET MAIL OPTIONS
          mailOptions = {
            from: "Techsmiths Digital Team <".concat(NODEMAILER_EMAIL_USERNAME, ">"),
            to: email,
            subject: heading,
            text: message
          }; // SEND EMAIL
          _context2.next = 6;
          return transporter.sendMail(mailOptions)
          // eslint-disable-next-line no-console
          .then(function (result) {
            return console.log(result);
          });
        case 6:
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          // eslint-disable-next-line no-console
          console.log(_context2.t0, (0, _typeof2["default"])(paymentSuccessfulMessage));
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function nodeMail(_x6, _x7, _x8, _x9, _x10) {
    return _ref2.apply(this, arguments);
  };
}();
exports.nodeMail = nodeMail;