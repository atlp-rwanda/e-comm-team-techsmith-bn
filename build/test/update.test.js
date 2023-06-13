"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _server = _interopRequireDefault(require("../server.js"));
_dotenv["default"].config();
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
describe('Update Password', function () {
  it('should return an error if old password is incorrect', function (done) {
    _chai["default"].request(_server["default"]).put('/api/users/update/password').send({
      email: 'keneon2003@gmail.com',
      oldPassword: 'Testin',
      newPassword: 'Testing@123',
      confPassword: 'Testing@123'
    }).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
  it('should return an error if new passwords do not match', function (done) {
    _chai["default"].request(_server["default"]).put('/api/users/update/password').send({
      email: 'keneon2003@gmail.com',
      oldPassword: 'Testing@123',
      newPassword: 'Testing@1',
      confPassword: 'Testing@123'
    }).end(function (err, res) {
      res.should.have.status(401);
      done();
    });
  });
});