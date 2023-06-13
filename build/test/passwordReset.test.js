"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _supertest = _interopRequireDefault(require("supertest"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _server = _interopRequireDefault(require("../server.js"));
var _random = _interopRequireDefault(require("../utils/random.js"));
_dotenv["default"].config();
var _require = require('mocha'),
  describe = _require.describe,
  it = _require.it;
var chai = require('chai');
chai.should();
chai.use(_chaiHttp["default"]);
var expect = chai.expect;
var user = {
  name: 'Test',
  email: "".concat((0, _random["default"])(5), "@gmail.com"),
  role: 3,
  password: 'Testing123',
  gender: 'M'
};
describe('Signup Test', function () {
  // INVALID EMAIL OR PASSWORD
  describe('No email or password provided', function () {
    it('Should return a 201 ', function (done) {
      chai.request(_server["default"]).post('/api/users/signup').send(user).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });
});

// GOOD REQUEST
var loginUser = {
  email: 'parfaitetwagira2003@gmail.com',
  password: '$2b$10$UyFfWtkc5MNHbasmk9USGeR9us1g3YcrCZfC8hiH1RHYe8leOBDUi'
};
describe('User authentication', function () {
  it('should return a response with status code 404', function (done) {
    chai.request(_server["default"]).post('/api/users/login').send(loginUser).end(function (err, res) {
      chai.expect(res).to.have.status(404);
      done();
    });
  });
});
describe('testing password reset', function () {
  it('should request password reset email', function () {
    (0, _supertest["default"])(_server["default"]).post('/api/password/requestReset').send({
      email: 'parfaitetwagira@gmail.com'
    }).end(function (err, res) {
      chai.expect(res).to.have.status(200);
      chai.expect(res.body).to.be.a('object');
    });
  });
  it('should request password reset email', function () {
    (0, _supertest["default"])(_server["default"]).post('/api/password/requestReset').send({}).end(function (err, res) {
      chai.expect(res).to.have.status(404);
    });
  });
  it('should reset password', function () {
    (0, _supertest["default"])(_server["default"]).post("/api/password/resetPassword/".concat(process.env.TOKEN)).send({
      password: 'newpassword'
    }).end(function (error, res) {
      chai.expect(res).to.have.status(400);
    });
  });
  it('should get users', function () {
    (0, _supertest["default"])(_server["default"]).get('/api/users/').end(function (error, res) {
      chai.expect(res).to.have.status(404);
    });
  });
});