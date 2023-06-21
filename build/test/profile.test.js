"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _server = _interopRequireDefault(require("../server.js"));
var expect = _chai["default"].expect;
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);

// Setting up Userscribe
var user1 = {
  email: 'ikevine@gmail.com',
  password: 'Kevine@123'
};
var user1Id = 394;
var updateUser = {
  name: 'Iradukunda Kellen',
  physicalAddress: 'Ghana'
};
var cookie = '';
describe('Update user info', function () {
  it('should update user info ', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(user1).end(function (err, res) {
      expect(res).to.have.status(200);
      cookie = res.header['set-cookie'][0];
      _chai["default"].request(_server["default"]).put("/api/users/".concat(user1Id)).set('cookie', cookie).send(updateUser).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});