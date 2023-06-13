"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
var _chai = _interopRequireWildcard(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);

// USER LOGIN
var loginUser = {
  email: 'logouttest@gmail.com',
  password: 'Password@00'
};
// COOKIE
var cookie = '';

// LOGGIN IN A USER
describe('Login user', function () {
  it('Should return a success code 200 after successful authentication', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(loginUser).end(function (err, res) {
      (0, _chai.expect)(res).to.have.status(200);
      cookie = res.header['set-cookie'][0];
      done();
    });
  });
});
describe('Logout Test', function () {
  // WHEN A USER IS LOGGED IN
  describe('Given a user is logged in', function () {
    it('Should return a success status with code 200', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/logout').set('cookie', cookie).end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(200);
        done();
      });
    });
  });

  // WHEN A USER IS NOT LOGGED IN
  describe('Given a user is not logged in', function () {
    it('Should return error 401 of Unauthorized', function (done) {
      _chai["default"].request(_server["default"]).post('/api/users/logout').end(function (err, res) {
        (0, _chai.expect)(res).to.have.status(401);
        done();
      });
    });
  });
});