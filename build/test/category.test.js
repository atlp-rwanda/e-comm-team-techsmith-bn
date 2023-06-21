"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server"));
var categoryId = 50;
describe('Category Controller', function () {
  // FETCH ALL CATEGORIES
  describe('Fetch all categories', function () {
    it('Should return all categories', function (done) {
      _chai["default"].request(_server["default"]).get('/api/category').end(function (err, res) {
        _chai["default"].expect(res).to.have.status(200);
        done();
      });
    });
  });

  // GET ALL PRODUCTS IN A CATEGORY
  describe('Get all products in a category', function () {
    it('Should return all products in a category', function (done) {
      _chai["default"].request(_server["default"]).get("/api/category/".concat(categoryId)).end(function (err, res) {
        _chai["default"].expect(res).to.have.status(200);
        done();
      });
    });
  });
});