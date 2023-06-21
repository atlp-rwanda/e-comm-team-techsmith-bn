"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server"));
var expect = _chai["default"].expect;
_chai["default"].use(_chaiHttp["default"]);
var userAdmin = {
  email: 'ntabanarene@gmail.com',
  password: 'rene@123'
};
var userId = 6365;
var cookie = '';

// LOGIN ADMIN
describe('Admin login', function () {
  it('should login admin and return cookie', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(userAdmin).end(function (err, res) {
      cookie = res.header['set-cookie'][0];
      expect(res).to.have.status(200);
      done();
    });
  });
});

// CHANGE ROLE
describe('changeRole function', function () {
  // USER NOT FOUND
  describe('Given a user is not found', function () {
    it('should return 404 if user is not found', function (done) {
      _chai["default"].request(_server["default"]).put("/api/users/100001/role/1").set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
  // USER FOUND
  describe('Given a user is found and admin is logged in', function () {
    it('should update the user role and return success response', function (done) {
      _chai["default"].request(_server["default"]).put("/api/users/".concat(userId, "/role/2")).set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});