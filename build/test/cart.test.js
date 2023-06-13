"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_dotenv["default"].config();
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
//PROCESS
process;
// USER LOGIN
var buyerLogin = {
  email: "ikevine@gmail.com",
  password: "Kevine@123"
};
var buyerLogin2 = {
  email: "irakozefrank@gmail.com",
  password: "Demo@12345"
};
/// COOKIE
var buyerCookie = '';
// BUYER LOGIN REQUEST
describe('Buyer user', function () {
  it('Should return a success code 200 after successful authentication', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(buyerLogin).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      buyerCookie = res.header['set-cookie'][0];
      done();
    });
  });
});
//CHECKING A PRODUCT IS NOT FOUND
describe('Product is not found', function () {
  it('should return code 404', function (done) {
    _chai["default"].request(_server["default"]).post('/api/cart/400000').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      done();
    });
  });
});
describe('Adding item to cart', function () {
  it('should add item to cart and return code 201', function (done) {
    _chai["default"].request(_server["default"]).post('/api/cart/16').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      (0, _chai.expect)(res.body.message).to.equal('Items are added successfully');
      done();
    });
  });
});

// CHECKING CART PRODUCT IF IS ALREADY EXIST
describe('Product already in cart', function () {
  it('should return code 409', function (done) {
    _chai["default"].request(_server["default"]).post('/api/cart/16').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(409);
      done();
    });
  });
});
describe('Getting all products in cart', function () {
  it('should return all products and http code 200', function (done) {
    _chai["default"].request(_server["default"]).get('/api/cart').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});

// DELETING A PRODUCT IN CART
describe('Deleting a product in cart', function () {
  it('should delete a product in cart and http code 200', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/cart/16').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});

// CLEARING ALL PRODUCTS IN CART
describe('clearing all products in cart', function () {
  it('should delete all products in cart and http code 200', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/cart').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});