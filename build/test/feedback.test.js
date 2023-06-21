"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
var _random = _interopRequireDefault(require("../utils/random.js"));
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var expect = _chai["default"].expect;
var notOrdered = {
  rating: 4,
  feedback: "".concat((0, _random["default"])(10))
};
var orderedNotPaid = {
  rating: 4,
  feedback: "".concat((0, _random["default"])(10))
};
var orderedPaid = {
  rating: 4,
  feedback: "".concat((0, _random["default"])(10))
};
var orderedPaidButerror = {
  ratingss: 4,
  feedbacksdfg: "".concat((0, _random["default"])(10))
};
var loginUser = {
  email: 'ikevine@gmail.com',
  password: 'Kevine@123'
};
var cookie = '';

// BUYER CAN CRUD ORDERS
describe('Sending ratings and feedback by buyer', function () {
  it('Buyer should be able to give feedback and ratings on the product', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(loginUser).end(function (err, res) {
      expect(res).to.have.status(200);
      cookie = res.header['set-cookie'][0];
      _chai["default"].request(_server["default"]).post('/api/feedback/4').send(orderedPaid).set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(201);
        done();
      });
    });
  });
  it('Buyer should provide available product in the order list', function (done) {
    _chai["default"].request(_server["default"]).post('/api/feedback/119').send(notOrdered).set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
  it('Buyer should provide available product in the order list', function (done) {
    _chai["default"].request(_server["default"]).post('/api/feedback/4').send(orderedPaidButerror).set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(500);
      done();
    });
  });
  it('Buyer should provide available product in the payment list', function (done) {
    _chai["default"].request(_server["default"]).post('/api/feedback/568').send(orderedNotPaid).set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
  it('Buyer should provide available product in the product list to view feedbacks ', function (done) {
    _chai["default"].request(_server["default"]).get("/api/feedback/12345").set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
  it('Buyer should provide available product in the payment list to view feedbacks', function (done) {
    _chai["default"].request(_server["default"]).get("/api/feedback/12345").set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});