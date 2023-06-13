"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _server = _interopRequireDefault(require("../server.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_dotenv["default"].config();
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
// USER LOGIN
var buyerLogin = {
  email: 'Kevine440@gmail.com',
  password: 'Testing@123'
};
// COOKIE
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
//ADDING PRODUCT INTO WISHLIST
describe('adding product into wishlist', function () {
  it('should return all products and http code 201', function (done) {
    _chai["default"].request(_server["default"]).post('/api/wishlist/50').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
});

// ADDING PRODUCT INTO WISHLIST
describe('adding product into wishlist', function () {
  it('should return all products and http code 201', function (done) {
    _chai["default"].request(_server["default"]).post('/api/wishlist/30').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(201);
      done();
    });
  });
});
// CHECKING A PRODUCT IS NOT FOUND
describe('Product is not found', function () {
  it('should return code 404', function (done) {
    _chai["default"].request(_server["default"]).post('/api/wishlist/400000').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(404);
      done();
    });
  });
});
// GETING ALL WISHLIST
describe('Getting all products in wishlist', function () {
  it('should return all products and http code 200', function (done) {
    _chai["default"].request(_server["default"]).get('/api/wishlist/').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});
// PRODUCT ALREADY EXISTS
describe(' product already in wishlist', function () {
  it('should return product already in wishlist and http code 409', function (done) {
    _chai["default"].request(_server["default"]).post('/api/wishlist/50').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(409);
      done();
    });
  });
});

// DELETE SINGLE PRODUCT FROM WISHLIST
describe('delete single prouduct from wishlist', function () {
  it('should return status code 200', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/wishlist/50').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});

// DELETE ALL PRODUCT FROM WISHLIST
describe('deleting all products in wishlist', function () {
  it('should delete all products in wishlist and http code 200', function (done) {
    _chai["default"].request(_server["default"])["delete"]('/api/wishlist/').set('cookie', buyerCookie).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      done();
    });
  });
});