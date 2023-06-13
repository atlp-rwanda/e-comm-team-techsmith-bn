"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _main = _interopRequireDefault(require("./main.js"));
// LOGIN VARIABLES
var email = document.getElementById('email');
var password = document.getElementById('password');

// LOGIN VARIABLES
var login_progress = document.getElementById('login-progress');
var login_sucess = document.getElementById('login-success');
var seller_login_progress = document.getElementById('seller-login-progress');

// VARIABLES TO PASS IN CHAT ROOM
var user = {};

// INITIATE SOCKET
// eslint-disable-next-line no-undef
var socket = io();

// FORM VARIABLES
var login_form = document.getElementById('login-form');

// HANDLE LOGIN
login_form.addEventListener('submit', function (e) {
  e.preventDefault();
  // ASSIGN VARIABLES
  var userLogin = {
    email: email.value,
    password: password.value
  };
  // SHOW LOGIN PROGRESS
  login_progress.style.display = 'block';
  login_sucess.style.display = 'none';
  seller_login_progress.style.display = 'none';
  // FETCH API
  fetch("".concat(_main["default"], "/users/login"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userLogin)
  }).then( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(res) {
      var data, _data, token;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            login_progress.style.display = 'none';
            // HANDLE RESPONSE
            if (!(res.status === 200)) {
              _context2.next = 11;
              break;
            }
            login_sucess.style.display = 'block';
            _context2.next = 5;
            return res.json();
          case 5:
            data = _context2.sent;
            user = {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              image: 'https://res.cloudinary.com/nishimweprince/image/upload/v1681665357/ecommerce/chatbox/kyjaoshy265u2pcksyda.png'
            };
            // SEND MESSAGE TO SERVER
            socket.emit('userLogin', user);
            // SET COOKIE
            document.cookie = "cookie=".concat(data.Authorization, "; Path=/");
            // STORE USER IN LOCAL STORAGE
            localStorage.setItem('user', JSON.stringify(user));
            setTimeout(function () {
              window.location.href = './chat.html';
            }, 1000);
          case 11:
            if (!(res.status === 202)) {
              _context2.next = 18;
              break;
            }
            seller_login_progress.style.display = 'block';
            _context2.next = 15;
            return res.json();
          case 15:
            _data = _context2.sent;
            token = _data.token;
            fetch("".concat(_main["default"], "/users/login/").concat(token), {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            }).then( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res) {
                var sellerData;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      if (!(res.status === 200)) {
                        _context.next = 11;
                        break;
                      }
                      seller_login_progress.style.display = 'none';
                      login_sucess.style.display = 'block';
                      _context.next = 5;
                      return res.json();
                    case 5:
                      sellerData = _context.sent;
                      user = {
                        id: sellerData.user.id,
                        name: sellerData.user.name,
                        email: sellerData.user.email,
                        image: 'https://res.cloudinary.com/nishimweprince/image/upload/v1681665357/ecommerce/chatbox/kyjaoshy265u2pcksyda.png'
                      };
                      // SEND MESSAGE TO SERVER
                      socket.emit('userLogin', user);
                      // SET COOKIE
                      document.cookie = "cookie=".concat(_data.Authorization, "; Path=/");
                      // STORE USER IN LOCAL STORAGE
                      localStorage.setItem('user', JSON.stringify(user));
                      setTimeout(function () {
                        window.location.href = './chat.html';
                      }, 1000);
                    case 11:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              }));
              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());
          case 18:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }())["catch"](function (err) {
    /*eslint-disable*/
    console.log(err);
    login_progress.style.display = 'none';
    login_sucess.style.display = 'none';
  });
});