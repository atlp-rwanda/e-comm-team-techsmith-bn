"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var expect = _chai["default"].expect;

// GOOD REQUEST
var loginUser = {
  email: 'gabby23@gmail.com',
  password: 'Gabby123@@@'
};

// SELLER LOGIN
var sellerLogin = {
  email: 'atlpseller@gmail.com',
  password: 'Password@00'
};

// UNKNOWN USER
var unknwonUser = {
  email: 'checkcehckchecckkk@gmail.com',
  password: '123456'
};

// INVALID PASSWORD
var invalidPassword = {
  email: 'ne12@gmail.com',
  password: 'idontknow'
};

// 2FA TOKEN
var twoFAToken = '';
describe('User authentication', function () {
  // VALID EMAIL AND PASSWORD
  describe('Valid email and password', function () {
    it('should return a 200 status code', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(loginUser).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  // UNKNOWN USER
  describe('User not found', function () {
    it('should return a 404 status code', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(unknwonUser).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  // SELLER LOGIN
  describe('Seller login', function () {
    it('should return a 307 status code', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(sellerLogin).end(function (err, res) {
        expect(res).to.have.status(202);
        twoFAToken = res.body.token;
        done();
      });
    });
  });

  // CONFIRM TWO FACTOR AUTHENTICATION
  describe('Confirm two factor authentication', function () {
    it('should return a 200 status code', function (done) {
      _chai["default"].request(_server["default"]).get("/api/users/login/".concat(twoFAToken)).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  // INVALID PASSWORD
  describe('Invalid password', function () {
    it('should return a 400 status code', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(invalidPassword).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  // login user
  describe('buyer login', function () {
    it('should return 200 status code', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(loginUser).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});