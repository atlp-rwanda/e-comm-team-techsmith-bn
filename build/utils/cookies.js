"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = exports.getCookie = void 0;
var getCookie = function getCookie(req) {
  // Check existence of the cookie and return it
  var cookie = req.headers.cookie ? req.headers.cookie : req.headers.authorization;
  return cookie;
};
exports.getCookie = getCookie;
var getToken = function getToken(req) {
  // Check existence of the cookie and return it
  var cookie = req.headers.cookie ? req.headers.cookie : req.headers.authorization;
  if (!cookie) {
    return null;
  }
  var token = cookie.split('=')[1].split(';')[0];
  return token;
};
exports.getToken = getToken;