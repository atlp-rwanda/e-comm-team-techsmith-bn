import db from '../../database/models/index.js';

// IMPORT NOTIFICATION MODEL
const { notification } = db;

class Notification {
  // CREATE NOTIFICATION
  static async createNotification(userId, title, body) {
    try {
      const newNotification = await notification.create({
        userId,
        title,
        body,
      });
      return newNotification;
    } catch (error) {
      return error;
    }
  }

  // READ SINGLE NOTIFICATION
  static async readSingleNotification(req, res) {
    try {
      const { id } = req.params;
      // CATCH USER ID FROM LOCAL RESPONSES
      const { id: userId } = res.locals;
      const singleNotification = await notification.findOne({
        where: { id, userId },
      });
      // IF NOTIFICATION DOES NOT EXIST
      if (!singleNotification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      // UPDATE NOTIFICATION STATUS TO READ
      const readNotification = await notification.update(
        { status: 1 },
        { where: { id }, returning: true, plain: true }
      );
      // RETURN RESPONSE
      return res.status(200).json({
        message: 'Notification read successfully',
        data: readNotification,
      });
      // CATCH ERROR IF ANY
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // READ ALL NOTIFICATIONS
  static async readAllNotifications(req, res) {
    const { id } = res.locals;
    try {
      // UPDATE NOTIFICATIONS STATUS TO READ
      const updatedNotifications = await notification.update(
        { status: 1 },
        {
          where: {
            userId: id,
          },
          returning: true,
          plain: true,
        }
      );
      // RETURN RESPONSE
      return res.status(200).json({
        message: 'Notifications read successfully',
        data: updatedNotifications,
      });
      // CATCH ERROR IF ANY
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  // GET ALL UNREAD NOTIFICATIONS
  static async getUnreadNotifications(req, res) {
    const { id } = res.locals;
    try {
      const unreadNotifications = await notification.findAll({
        where: { userId: id, status: 0 },
      });
      // NOTIFICATIONS NOT FOUND
      if (unreadNotifications.length < 1) {
        return res.status(200).json({ message: 'You are all caught up' });
      }
      // RETURN RESPONSE
      return res.status(200).json({
        message: 'Notifications retrieved successfully',
        data: unreadNotifications,
      });
      // CATCH ERROR IF ANY
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // DELETE NOTIFICATION
  static async deleteSingleNotification(req, res) {
    try {
      const { id } = req.params;
      // CATCH USER ID FROM LOCAL RESPONSES
      const { id: userId } = res.locals;
      const singleNotification = await notification.findOne({
        where: { id, userId },
      });
      // IF NOTIFICATION DOES NOT EXIST
      if (!singleNotification) {
        return res.status(404).json({ message: 'Notification not found' });
      }
      // DELETE NOTIFICATION
      const deletedNotification = await notification.destroy({ where: { id } });
      // RETURN RESPONSE
      return res
        .status(200)
        .json({ message: 'Notification deleted', data: deletedNotification });
      // CATCH ERROR IF ANY
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // GET ALL NOTIFICATIONS
  static async getAllNotifications(req, res) {
    const { id } = res.locals;
    try {
      // GET ALL NOTIFICATIONS
      const allNotifications = await notification.findAll({
        where: { userId: id },
      });
      // NOTIFICATIONS NOT FOUND
      if (allNotifications.length < 1) {
        return res.status(200).json({ message: 'You are all caught up' });
      }
      // RETURN RESPONSE
      return res.status(200).json({
        message: 'Notifications retrieved successfully',
        data: allNotifications,
      });
      // CATCH ERROR IF ANY
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default Notification;
