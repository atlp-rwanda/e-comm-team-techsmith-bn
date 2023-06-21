"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _notificationController = _interopRequireDefault(require("../controllers/notificationController"));
var _verifyIsSeller = _interopRequireDefault(require("../middlewares/verifyIsSeller"));
// CREATE ROUTER
var router = _express["default"].Router();

// ROUTE TO NOTIFICATION PAGE
router.get('/view', function (req, res) {
  return res.render('notification');
});

/**
 * NOTIFICATION ROUTE
 */

// GET ALL NOTIFICATION
router.get('/', _verifyIsSeller["default"], _notificationController["default"].getAllNotifications);

// READ SINGLE NOTIFICATION
router.put('/:id', _verifyIsSeller["default"], _notificationController["default"].readSingleNotification);

// READ ALL NOTIFICATIONS
router.get('/read', _verifyIsSeller["default"], _notificationController["default"].readAllNotifications);

// DELETE SINGLE NOTIFICATION
router["delete"]('/:id', _verifyIsSeller["default"], _notificationController["default"].deleteSingleNotification);

// GET ALL UNREAD NOTIFICATIONS
router.get('/unread', _verifyIsSeller["default"], _notificationController["default"].getUnreadNotifications);

// EXPORT ROUTER
var _default = router;
exports["default"] = _default;