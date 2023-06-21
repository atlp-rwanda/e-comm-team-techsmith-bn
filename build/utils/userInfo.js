"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
// Excluding Password and Email
var UserInfos = /*#__PURE__*/function () {
  function UserInfos() {
    (0, _classCallCheck2["default"])(this, UserInfos);
  }
  (0, _createClass2["default"])(UserInfos, null, [{
    key: "usersInfos",
    value: function usersInfos(users) {
      var information = [];
      users.forEach(function (user) {
        var info = {
          name: user.name,
          roleId: user.roleId,
          isActive: user.isActive,
          gender: user.gender,
          birthDate: user.birthDate,
          preferredLanguage: user.preferredLanguage,
          preferredCurrency: user.preferredCurrency,
          physicalAddress: user.physicalAddress,
          googleId: user.googleId
        };
        information.push(info);
      });
      return information;
    }
  }, {
    key: "userInfos",
    value: function userInfos(user) {
      var information = {
        name: user.name,
        roleId: user.roleId,
        isActive: user.isActive,
        gender: user.gender,
        birthDate: user.birthDate,
        preferredLanguage: user.preferredLanguage,
        preferredCurrency: user.preferredCurrency,
        physicalAddress: user.physicalAddress,
        googleId: user.googleId
      };
      return information;
    }
  }]);
  return UserInfos;
}();
var _default = UserInfos;
exports["default"] = _default;