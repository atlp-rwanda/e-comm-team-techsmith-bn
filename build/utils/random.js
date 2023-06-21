"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var makeid = function makeid(length) {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  var counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
var _default = makeid;
exports["default"] = _default;