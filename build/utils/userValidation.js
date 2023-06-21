"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePassword = exports.validateEmail = void 0;
// VALIDATE EMAIL
var validateEmail = function validateEmail(email) {
  // validate user email
  var emailRegex = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;
  var validEmail = emailRegex.test(email);
  return validEmail;
};

// VALIDATE PASSWORD
exports.validateEmail = validateEmail;
var validatePassword = function validatePassword(password) {
  var response = null;
  // validate user password
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  response = passwordRegex.test(password);
  return response;
};
exports.validatePassword = validatePassword;