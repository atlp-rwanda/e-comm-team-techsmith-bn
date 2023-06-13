"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function getExpiryDateAndId(arr) {
  var result = [];
  /* eslint-disable */
  for (var i = 0; i < arr.length; i++) {
    var _arr$i = arr[i],
      id = _arr$i.id,
      expiryDate = _arr$i.expiryDate,
      userId = _arr$i.userId,
      name = _arr$i.name;
    result.push({
      id: id,
      expiryDate: expiryDate,
      userId: userId,
      name: name
    });
  }
  return result;
}

// Path: src/utils/getIdAndDate.js
var _default = getExpiryDateAndId;
exports["default"] = _default;