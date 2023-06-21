"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _server = _interopRequireDefault(require("../server.js"));
var _random = _interopRequireDefault(require("../utils/random.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_dotenv["default"].config();
var expect = chai.expect;
chai.should();
chai.use(_chaiHttp["default"]);

// AUTHORIZATION TOKEN
var cookie = '';
var user = {
  name: 'Joshua Karenzi',
  email: "".concat((0, _random["default"])(5), "@gmail.com"),
  password: 'Testing@123',
  role: 1,
  gender: 'male'
};
var adminLogin = {
  email: 'joshua@gmail.com',
  password: 'Testing@123'
};

// ADMIN LOGIN
describe('Admin Login', function () {
  it('Login and return admin cookie', function (done) {
    chai.request(_server["default"]).post('/api/users/login').send(adminLogin).end(function (err, res) {
      cookie = res.header['set-cookie'][0];
      expect(res).to.have.status(200);
      done();
    });
  });
});

/* ADMIN CRUD */
describe('CRUD users by admin', function () {
  // GET ALL USERS
  describe('Admin should be able to get all users', function () {
    it('Admin should be able to get all users', function (done) {
      chai.request(_server["default"]).get('/api/admin/users').set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  // STATUS CODE OF 500 NEED TO BE TESTED

  // THE STATUS CODE OF 404 ALSO NEED TO BE DONE

  describe('Admin want to get all user but on unexisting page ', function () {
    it('Should not get any user and return error 404', function (done) {
      chai.request(_server["default"]).get('/api/admin/users?page=5000').set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  // CREATE NEW USER
  describe('Given a user is an admin', function () {
    it('Should create a new user', function (done) {
      chai.request(_server["default"]).post('/api/admin/users').send(user).set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(201);
        done();
      });
    });
  });

  // THE STATUS CODE OF 401 SHOULD BE TESTED

  describe('An Invalid user want to login', function () {
    it('Should not create create a new user and get 401', function (done) {
      chai.request(_server["default"]).post('/api/admin/users').send(!user).set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(401);
        done();
      });
    });
  });

  // THE STATUS CODE OF 409 SHOULD BE TESTED

  // UPDATE USER
  describe('Given a user is an admin', function () {
    it('Should update a user', function (done) {
      chai.request(_server["default"]).put('/api/admin/users/1').send({
        name: "IRAKOZE ".concat((0, _random["default"])(5)),
        gender: 'M'
      }).set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  // DELETE NON-EXISTING USER
  describe('Given a user is an admin and is trying to delete a non-existing user', function () {
    it('Should not delete a user and return error 404', function (done) {
      chai.request(_server["default"])["delete"]('/api/admin/users/10001001').set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});

// user routes
describe('Getting one user', function () {
  // GET ALL USERS
  describe(' should be able to get a user', function () {
    it('user should be able to get a user', function (done) {
      chai.request(_server["default"]).get('/api/users/394').set('cookie', cookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});