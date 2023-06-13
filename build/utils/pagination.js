"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPagingData = exports.getPagination = void 0;
var getPagination = function getPagination(page, size) {
  var limit = size ? +size : 5;
  var offset = page ? page * limit : 0;
  return {
    limit: limit,
    offset: offset
  };
};
exports.getPagination = getPagination;
var getPagingData = function getPagingData(data, page, limit) {
  var count = data.count,
    rows = data.rows;
  var currentPage = page ? +page : 0;
  var totalPages = Math.ceil(count / limit);
  return {
    count: count,
    rows: rows,
    totalPages: totalPages,
    currentPage: currentPage
  };
};
exports.getPagingData = getPagingData;