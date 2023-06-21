"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
var _random = _interopRequireDefault(require("../utils/random.js"));
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var expect = _chai["default"].expect;
var newUser = {
  name: 'Test',
  email: "".concat((0, _random["default"])(5), "@gmail.com"),
  role: 1,
  password: 'Testing123'
};
var user = {
  namess: 'Test',
  emailss: "".concat((0, _random["default"])(5), "@gmail.com"),
  role: 1,
  password: 'Testing123'
};
var userExists = {
  name: 'Test',
  email: 'bel12@gmail.com',
  role: 2,
  password: 'password101'
};
var userInvalidEmail = {
  name: 'Test',
  email: "".concat((0, _random["default"])(10)),
  role: 1,
  password: 'Testing123'
};
describe('Signup Test', function () {
  // INVALID EMAIL OR PASSWORD
  describe('No email or password provided', function () {
    it('Should return a 400 status code indicating bad request', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/signup').send(userInvalidEmail).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  // IF A USER ALREADY EXISTS
  describe('User already exists', function () {
    it('Should return a 409 status code indicating conflict', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/signup').send(userExists).end(function (err, res) {
        expect(res).to.have.status(409);
        done();
      });
    });
  });

  // IF A USER ALREADY EXISTS
  describe('User already exists', function () {
    it('Should return a 500 status code indicating conflict', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/signup').send(user).end(function (err, res) {
        expect(res).to.have.status(500);
        done();
      });
    });
  });

  //
});