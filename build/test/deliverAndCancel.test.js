"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var expect = _chai["default"].expect;

// LOGIN THE ADMIN INORDER TO CONFIRM THE ORDER

var buyerUser = {
  "email": "ikevine@gmail.com",
  "password": "Kevine@123"
};

// REGULAR USER

var seller = {
  "email": "gabs1@gmail.com",
  "password": "@Gaby12345"
};

// order for on way test
var orderOnWayId = 256;

// ORDERS TO BE DELIVERD AND UNKNOWN ORDERS
var knownOrder = 256;
var unknownOrder = 10093;

// TOKENS
var buyerCookie = '',
  sellerCookie = '',
  twoFAToken = '';
describe('Login to change order Status', function () {
  describe('Buyer user login', function () {
    it('should return 200', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(buyerUser).end(function (err, res) {
        expect(res).to.have.status(200);
        buyerCookie = res.header['set-cookie'][0];
        done();
      });
    });
  });

  // SELLER LOGIN
  describe('Login the seller and give seller cookie', function () {
    describe('Seller login', function () {
      it('should return a 307 status code', function (done) {
        _chai["default"].request(_server["default"]).post('/api/users/login').send(seller).end(function (err, res) {
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
          sellerCookie = res.header['set-cookie'][0];
          done();
        });
      });
    });
  });
});

// test the order cancellation set
describe('Order cancelled successfully', function () {
  it('Should cancel the order', function (done) {
    _chai["default"].request(_server["default"]).put("/api/orders/cancelled/".concat(knownOrder)).set('Cookie', buyerCookie).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});

// after login let us deliver and cancel some orders

describe('Delivered Order', function () {
  describe('Invalid Id was provided', function () {
    it('should recognize invalid order id 404', function (done) {
      _chai["default"].request(_server["default"]).put("/api/orders/delivered/".concat(unknownOrder)).set('cookie', sellerCookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  // when successfully delivered
  describe('Order is marked as delivered', function () {
    it('should update the status to delivered', function (done) {
      _chai["default"].request(_server["default"]).put("/api/orders/delivered/".concat(knownOrder)).set('cookie', sellerCookie).end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });
  });
});

// test order on way
describe('Order marked as on the way', function () {
  it('Should mark order as on way', function (done) {
    _chai["default"].request(_server["default"]).put("/api/orders/onWay/".concat(orderOnWayId)).set('Cookie', sellerCookie).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});