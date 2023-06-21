"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var buyerLogin = {
    email: 'payee@gmail.com',
    password: 'Password@00'
  },
  userLogin = {
    email: 'otheruser@gmail.com',
    password: 'Password@00'
  },
  orderPaidFor = 497,
  unavailableOrder = -1,
  doesNotOwnOrder = 408,
  orderId = 442,
  card = {
    number: 4242424242424242,
    exp_month: 12,
    exp_year: 2025,
    cvc: 123
  };
var buyerCookie = '',
  userCookie = '';

/**
 * USER LOGIN TESTS
 */
describe('User login', function () {
  // BUYER LOGIN
  describe('Given a buyer wants to login', function () {
    it('should login a user', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(buyerLogin).end(function (err, res) {
        res.should.have.status(200);
        buyerCookie = res.header['set-cookie'][0];
        done();
      });
    });
  });
  // OTHER USER LOGIN (NOT BUYER)
  describe('Given a user wants to login', function () {
    it('should login a user', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/login').send(userLogin).end(function (err, res) {
        res.should.have.status(202);
        userCookie = res.header['set-cookie'][0];
        done();
      });
    });
  });
});

/**
 * PAYMENT TESTS
 */
describe('Payment Test', function () {
  // ORDER ALREADY PAID
  describe('Given an order is already paid for', function () {
    it('should return conflict 409 order already paid', function (done) {
      _chai["default"].request(_server["default"]).post("/api/orders/".concat(orderPaidFor, "/checkout")).send(card).set('cookie', buyerCookie).end(function (err, res) {
        res.should.have.status(409);
        done();
      });
    });
  });
  // ORDER DOES NOT EXIST
  describe('Given an order does not exist', function () {
    it('should return error 404 order not found', function (done) {
      _chai["default"].request(_server["default"]).post('/api/orders/100000/checkout').send(card).set('cookie', buyerCookie).end(function (err, res) {
        res.should.have.status(404);
        done();
      });
    });
  });
  // USER DOES NOT OWN ORDER
  describe('Given a user does not own order', function () {
    it('should return error 403 forbidden', function (done) {
      _chai["default"].request(_server["default"]).post("/api/orders/".concat(doesNotOwnOrder, "/checkout")).send(card).set('cookie', buyerCookie).end(function (err, res) {
        res.should.have.status(403);
        done();
      });
    });
  });
  // USER NOT LOGGED IN
  describe('Given a user is not logged in', function () {
    it('should throw error of 401 unauthorized', function (done) {
      _chai["default"].request(_server["default"]).post("/api/orders/".concat(orderPaidFor, "/checkout")).send(card).end(function (err, res) {
        res.should.have.status(401);
        done();
      });
    });
  });
  // USER LOGGED IN BUT NOT A BUYER
  describe('Given a user is logged in but not a buyer', function () {
    it('should return error 403 forbidden', function (done) {
      _chai["default"].request(_server["default"]).post("/api/orders/".concat(unavailableOrder, "/checkout")).send(card).set('cookie', userCookie).end(function (err, res) {
        res.should.have.status(403);
        done();
      });
    });
  });

  // INVALID CARD PROVIDED
  describe('Given an invalid card is provided', function () {
    it('should return error 500 from Stripe', function (done) {
      _chai["default"].request(_server["default"]).post("/api/orders/".concat(orderId, "/checkout")).send({
        number: 'Invalid card number',
        exp_month: 'Invalid month',
        exp_year: 2022,
        cvc: 1234
      }).set('cookie', buyerCookie).end(function (err, res) {
        res.should.have.status(500);
        done();
      });
    });
  });

  // DELETE PAYMENT USING ORDER ID
  describe('Given a buyer wants to delete a payment', function () {
    it('should delete a payment', function (done) {
      _chai["default"].request(_server["default"])["delete"]("/api/payments/".concat(orderId)).set('cookie', buyerCookie).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
});

// GET ALL PAYMENTS
describe('Given a buyer wants to get all payments they have completed', function () {
  it('should return all payments', function (done) {
    _chai["default"].request(_server["default"]).get('/api/payments').set('cookie', buyerCookie).end(function (err, res) {
      res.should.have.status(200);
      done();
    });
  });
});