"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
var _path = _interopRequireDefault(require("path"));
var _moment = _interopRequireDefault(require("moment"));
var _passport = _interopRequireDefault(require("passport"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _socket = _interopRequireDefault(require("socket.io"));
var _allRoutes = _interopRequireDefault(require("./routes/allRoutes.js"));
var _index = _interopRequireDefault(require("../database/models/index.js"));
require("./utils/shedulerController.js");
var _chatroomController = require("./controllers/chatroomController.js");
// CONFIGURE DOTENV
_dotenv["default"].config();

// PATH TO STATIC FILES
var views = _path["default"].join(__dirname, 'views');
var app = (0, _express["default"])();

// SET DEFALULT ENGINE FOR TESING
app.set('view engine', 'ejs');
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _cors["default"])({
  origin: '*'
}));
app.use('/chat', _express["default"]["static"](views));
app.use((0, _expressSession["default"])({
  secret: [process.env.SESSIONCOOKIE],
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use('/api', _allRoutes["default"]);
var PORT = process.env.PORT;

// CREATE EXPRESS SERVER
var server = app.listen(PORT);

// INITIALIZE SOCKET.IO
var io = (0, _socket["default"])(server);

// eslint-disable-next-line
exports.io = io;
io.on('connection', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(socket) {
    var userConnected, messages;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          // ALTER USER CONNECTION MESSAGE
          userConnected = {
            message: 'A user has joined the chat',
            time: (0, _moment["default"])().format('MMM D, h:mm A')
          }; // ADD LOGGED IN USER TO ACTIVE USERS
          socket.on('userLogin', /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
              var newUser;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (0, _chatroomController.addActiveUser)(user);
                  case 2:
                    newUser = _context.sent;
                    io.emit('newUser', newUser);
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }());
          socket.on('joinChat', /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(user) {
              var activeUsers;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _chatroomController.getActiveUsers)();
                  case 2:
                    activeUsers = _context2.sent;
                    // BROADCAST ACTIVE USERS
                    io.emit('activeUsers', activeUsers);
                    console.log("User ".concat(user.name, " has joined the chat"));
                  case 5:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x3) {
              return _ref3.apply(this, arguments);
            };
          }());
          // BROADCAST WHEN USER CONNECTS
          socket.emit('message', userConnected);
          // GET MESSAGES FROM DB
          _context6.next = 6;
          return (0, _chatroomController.getMessages)();
        case 6:
          messages = _context6.sent;
          // SEND MESSAGES TO CLIENT
          socket.emit('serverMessages', messages);
          // CREATE NEW MESSAGE IN DB
          socket.on('createMessage', /*#__PURE__*/function () {
            var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(message) {
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    try {
                      (0, _chatroomController.createMessage)(message).then(function (newMessage) {
                        // eslint-disable-next-line
                        console.log(newMessage);
                        io.emit('newMessage', newMessage);
                      })["catch"](function (error) {
                        // eslint-disable-next-line
                        console.log(error);
                      });
                    } catch (error) {
                      console.log(error, message);
                    }
                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x4) {
              return _ref4.apply(this, arguments);
            };
          }());
          socket.on('leave', /*#__PURE__*/function () {
            var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(user) {
              var response;
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return (0, _chatroomController.removeActiveUser)(user);
                  case 2:
                    response = _context4.sent;
                    console.log((0, _typeof2["default"])(response));
                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x5) {
              return _ref5.apply(this, arguments);
            };
          }());
          socket.on('disconnect', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
            return _regenerator["default"].wrap(function _callee5$(_context5) {
              while (1) switch (_context5.prev = _context5.next) {
                case 0:
                  console.log('user disconnected', socket.id);
                case 1:
                case "end":
                  return _context5.stop();
              }
            }, _callee5);
          })));
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var dbCon = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _index["default"].sequelize.authenticate();
        case 3:
          _context7.next = 8;
          break;
        case 5:
          _context7.prev = 5;
          _context7.t0 = _context7["catch"](0);
          console.log("db error: ".concat(_context7.t0.message));
        case 8:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 5]]);
  }));
  return function dbCon() {
    return _ref7.apply(this, arguments);
  };
}();
Promise.all([dbCon(), server]).then(function () {
  console.log("Server listening on port:".concat(PORT));
  console.log('DB connection successful');
});
var _default = app;
exports["default"] = _default;