"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
var expect = _chai["default"].expect;
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var sellerCookie = '',
  twoFAToken = '';
var seller = {
  "email": "gabs1@gmail.com",
  "password": "@Gaby12345"
};
describe('Seller login', function () {
  it('Should return 200 ', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(seller).end(function (err, res) {
      twoFAToken = res.body.token;
      expect(res).to.have.status(202);
      done();
    });
  });
});
describe('Seller 2FA', function () {
  it('Confirm 2FA and return seller cookie', function (done) {
    _chai["default"].request(_server["default"]).get("/api/users/login/".concat(twoFAToken)).end(function (err, res) {
      sellerCookie = res.header['set-cookie'];
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('Seller Statistics', function () {
  it('Return statistics of a seller with a 200 status code ', function (done) {
    _chai["default"].request(_server["default"]).post("/api/statistics/seller").set('cookie', sellerCookie).end(function (err, res) {
      sellerCookie = res.header['set-cookie'];
      expect(res).to.have.status(200);
      done();
    });
  });
});