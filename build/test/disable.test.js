"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var expect = _chai["default"].expect;
var admin = {
  email: 'gabs0@gmail.com',
  password: '@Gaby12345'
};
var regularUser = {
  email: 'gabs2@gmail.com',
  password: '@Gaby12345'
};
var regularUserId = 10;
var unkownUserId = -1;

// TOKENS
var adminCookie = '',
  regularCookie = '',
  adminToken = '',
  regularToken = '';
describe('Login test', function () {
  describe('Admin login', function () {
    it('should return admin token', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(admin).end(function (err, res) {
        expect(res).to.have.status(200);
        adminCookie = res.header['set-cookie'][0];
        adminToken = res.body.Authorization;
        console.log(adminCookie);
        done();
      });
    });
  });
});
describe('Regular user login', function () {
  it('should return a regular token', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(regularUser).end(function (err, res) {
      expect(res).to.have.status(202);
      regularCookie = res.header['set-cookie'][0];
      regularToken = res.body.Authorization;
      console.log(regularCookie);
      done();
    });
  });
});
describe('Disable user', function () {
  describe('User is enabled', function () {
    it('Should disable a user', function (done) {
      _chai["default"].request(_server["default"]).put("/api/users/disable/".concat(regularUserId)).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  describe('User is not found', function () {
    it('Should return an error 404', function (done) {
      _chai["default"].request(_server["default"]).put("/api/users/disable/".concat(unkownUserId)).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});
describe('Enable user', function () {
  describe('User not found', function () {
    it('Should return error 404', function (done) {
      _chai["default"].request(_server["default"]).put("/api/users/enable/".concat(unkownUserId)).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
  describe('User is disabled', function () {
    it('Should enable a user', function (done) {
      _chai["default"].request(_server["default"]).put("/api/users/enable/".concat(regularUserId)).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});