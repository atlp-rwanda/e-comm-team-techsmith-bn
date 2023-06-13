"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
var _random = _interopRequireDefault(require("../utils/random.js"));
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var expect = _chai["default"].expect;
var goodRequest = {
  name: 'Nishimwe',
  email: "".concat((0, _random["default"])(5), "@gmail.com")
};
var invalidEmail = {
  name: 'John Doe',
  email: 'atlpemail'
};
var userExists = {
  name: goodRequest.name,
  email: goodRequest.email
};
var token = '';
describe('Newsletter Subscription', function () {
  describe('Valid email', function () {
    it('should return a response with status code 201', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/requestNewsletter').send(goodRequest).end(function (err, res) {
        expect(res).to.have.status(201);
        done();
        token = res.body.token;
      });
    });
  });
  describe('Confirm subscription', function () {
    it('should return a response with status code 200', function (done) {
      _chai["default"].request(_server["default"]).get("/api/users/confirmNewsletter/".concat(token)).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  describe('Invalid email', function () {
    it('should return a response with status code 400', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/requestNewsletter').send(invalidEmail).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
  describe('User already exists', function () {
    it('should return a response with status code 409', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/requestNewsletter').send(userExists).end(function (err, res) {
        expect(res).to.have.status(409);
        done();
      });
    });
  });
});