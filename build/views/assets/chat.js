"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _main = _interopRequireDefault(require("./main.js"));
// READ USER FROM LOCAL STORAGE
var loggedInUser = JSON.parse(localStorage.getItem('user'));
// eslint-disable-next-line no-console
console.log(loggedInUser);

// IF A USER IS NOT LOGGEDIN REDIRECT TO LOGIN PAGE
if (!loggedInUser) {
  window.location.href = './index.html';
}

// GLOBAL VARIABLES
var chatbox = document.getElementById('chatbox');

// GLOBAL FEEDBACK VARIABLES
var logging_out = document.getElementById('logging-out');
var user_connected_container = document.querySelector('.user-connected-container');

// eslint-disable-next-line no-undef
var socket = io();

/**
 *
 * DISPLAY FUNCTIONS
 */
// MESSAGE VARIABLES
// DISPLAY USER MESSAGE
function displayMessage(_x) {
  return _displayMessage.apply(this, arguments);
} // USER VARIABLES
function _displayMessage() {
  _displayMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(messageResponse) {
    var messageList, user, messageBody, createdAt, li;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // eslint-disable-next-line
          console.log(messageResponse);
          messageList = document.getElementById('message-list');
          user = messageResponse.user, messageBody = messageResponse.messageBody, createdAt = messageResponse.createdAt;
          li = document.createElement('li');
          li.classList.add('message');
          // eslint-disable-next-line
          user.email === loggedInUser.email ? li.classList.add('owner') : li.classList.add('other');
          li.innerHTML = "\n<img src=".concat(loggedInUser.image, " alt=\"\" class=\"message-icon\">\n<section class=\"message-details\">\n<p class=\"message-body\">\n").concat(messageBody, "\n</p>\n<span class=\"message-meta\">\n<p class=\"message-sender\">").concat(user.name, "</p>\n<p class=\"message-time\">").concat(createdAt, "</p>\n</span>\n</section>\n");
          messageList.appendChild(li);
          chatbox.scrollTop = chatbox.scrollHeight;
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _displayMessage.apply(this, arguments);
}
var userList = document.getElementById('users-list');
// DISPLAY USER LIST
var displayUserList = function displayUserList(users) {
  while (userList.firstChild) {
    userList.removeChild(userList.firstChild);
  }
  users.forEach(function (user) {
    var name = user.user.name;
    var li = document.createElement('li');
    li.classList.add('user-list-item');
    li.innerHTML = "\n  <a href=\"#\" class=\"user-list-link\">".concat(name, "</a>\n  ");
    userList.appendChild(li);
  });
  // eslint-disable-next-line no-console
  console.log(users);
};

// GET ACTIVE USERS
socket.on('activeUsers', function (users) {
  displayUserList(users);
});

// CATCH USERS FROM SERVER
socket.on('users', function (users) {
  displayUserList(users);
});
socket.on('message', function (message) {
  // eslint-disable-next-line no-console
  console.log(message);
});
socket.on('serverMessages', function (messages) {
  messages.forEach(function (message) {
    displayMessage(message);
  });
});
document.addEventListener('DOMContentLoaded', function () {
  // SEND MESSAGE TO SERVER
  socket.emit('joinChat', loggedInUser);
  // SCROLL TO LAST MESSAGE
  chatbox.addEventListener('load', function () {
    // SCROLL TO LAST MESSAGE
    chatbox.scrollTop = chatbox.scrollHeight;
  });
});

// HANDLE LOGOUT
var logout = document.getElementById('leave-chat');
logout.addEventListener('click', function (e) {
  e.preventDefault();
  // CATCH COOKIE AND SEND IT TO SERVER
  var _document = document,
    cookie = _document.cookie;
  // SHOW LOGOUT PROGRESS
  logging_out.style.display = 'block';
  fetch("".concat(_main["default"], "/users/logout"), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: "".concat(cookie, "}")
    }
  }).then( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            // HANDLE RESPONSE
            if (res.status === 200) {
              // REMOVE USER FROM LOCAL STORAGE
              localStorage.removeItem('user');
              // DESTROY COOKIE
              document.cookie.split(';').forEach(function (c) {
                document.cookie = c.replace(/^ +/, '').replace(/=.*/, "=;expires=".concat(new Date().toUTCString(), ";path=/"));
              });
              // SEND MESSAGE TO SERVER
              socket.emit('leave', loggedInUser);
              // REDIRECT TO LOGIN PAGE
              setTimeout(function () {
                window.location.href = './index.html';
                logging_out.style.display = 'none';
              }, 1000);
            }
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }())["catch"](function (err) {
    /*eslint-disable*/
    console.log(err);
  });
});

// HANDLE SEND MESSAGE
var send = document.getElementById('send-button');
send.addEventListener('click', function (e) {
  e.preventDefault();
  // GET MESSAGE FROM INPUT
  var message = document.getElementById('message');
  var messagePayload = {
    message: message.value,
    loggedInUser: loggedInUser
  };
  message.value = '';
  // SEND MESSAGE TO SERVER
  socket.emit('createMessage', messagePayload);
});

// GET MESSAGE FROM SERVER
socket.on('newMessage', function (message) {
  displayMessage(message);
});

// BROADCAST NEW USER TO OTHER USERS
socket.on('newUser', function (user) {
  var name = user.user.name;
  // eslint-disable-next-line no-console
  console.log(name);
  var user_connected = document.createElement('p');
  user_connected.setAttribute('id', 'user-connected');
  user_connected.style.display = 'block';
  user_connected.innerHTML = "\n      ".concat(name, " has joined the chat\n  ");
  user_connected_container.appendChild(user_connected);
  setTimeout(function () {
    user_connected.style.display = 'none';
  }, 3000);
});