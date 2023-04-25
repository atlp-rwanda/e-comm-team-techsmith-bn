import express from 'express';
import Notification from '../controllers/notificationController';
import isSeller from '../middlewares/verifyIsSeller';

// CREATE ROUTER
const router = express.Router();

// ROUTE TO NOTIFICATION PAGE
router.get('/view', (req, res) => res.render('notification'));

/**
 * NOTIFICATION ROUTE
 */

// GET ALL NOTIFICATION
router.get('/', isSeller, Notification.getAllNotifications);

// READ SINGLE NOTIFICATION
router.put('/:id', isSeller, Notification.readSingleNotification);

// READ ALL NOTIFICATIONS
router.get('/read', isSeller, Notification.readAllNotifications);

// DELETE SINGLE NOTIFICATION
router.delete('/:id', isSeller, Notification.deleteSingleNotification);

// GET ALL UNREAD NOTIFICATIONS
router.get('/unread', isSeller, Notification.getUnreadNotifications);

// EXPORT ROUTER
export default router;
