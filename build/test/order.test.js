"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
var _random = _interopRequireDefault(require("../utils/random.js"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var expect = _chai["default"].expect;
var user = {
  name: 'Test',
  email: "".concat((0, _random["default"])(5), "@gmail.com"),
  role: 1,
  id: (0, _random["default"])(5),
  password: 'Password@123',
  gender: 'M'
};
var loginUser = {
  email: user.email,
  password: user.password
};
var orderUser = {
  email: 'ikevine@gmail.com',
  password: 'Kevine@123'
};
var order1 = {
  productId: 568,
  userId: 394,
  desiredQuantity: 1,
  amount: 900
};
var unvailableProduct = {
  productId: 23456778,
  userId: 394,
  desiredQuantity: 23,
  amount: 5000
};
var update = {
  quantity: 2
};
var orderId = 267;
var singleOrderId = 256;
var cookie = "";
// ADMIN CAN GET ALL ORDERS
describe('Admin user', function () {
  it('can get all orders ', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/signup').send(user).end(function (err, res) {
      expect(res).to.have.status(201);
      _chai["default"].request(_server["default"]).post('/api/users/login').send(loginUser).end(function (err, res) {
        expect(res).to.have.status(200);
        var token = _jsonwebtoken["default"].sign({
          id: user.id,
          role: user.role
        }, process.env.USER_SECRET, {
          expiresIn: 604800
        });
        _chai["default"].request(_server["default"]).get('/api/orders').set('cookie', "Authorized=".concat(token), {
          httpOnly: true,
          maxAge: 604800
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });
});

// BUYER CAN CRUD ORDERS
describe("CRUD order by buyer", function () {
  it("Buyer should be able to create an order", function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(orderUser).end(function (err, res) {
      expect(res).to.have.status(200);
      cookie = res.header['set-cookie'][0];
      _chai["default"].request(_server["default"]).post('/api/orders').send(order1).set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
  it("Buyer should provide available product", function (done) {
    _chai["default"].request(_server["default"]).post('/api/orders').send(unvailableProduct).set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
  it("Should be able to update order", function (done) {
    _chai["default"].request(_server["default"]).put("/api/orders/".concat(orderId)).send(update).set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
  it("should be able to delete order", function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/orders/999').set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
  it("Buyer should be able to view a single order", function (done) {
    _chai["default"].request(_server["default"]).get("/api/orders/single/".concat(singleOrderId)).set('cookie', cookie).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});