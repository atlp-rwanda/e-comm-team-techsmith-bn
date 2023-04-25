import db from '../../database/models';

const { user: User } = db;
const logger = require('./logger');

class dis_enableController {
  static async disableUser({ params }, res) {
    try {
      const user = await User.findOne({ where: { id: params.id } });

      if (!user) {
        logger.userLogger.error(
          ' /PUT statusCode: 404 : Account to be disabled not found '
        );
        return res
          .status(404)
          .json({ error: 'Account to be disabled not found!' });
      }

      await User.update(
        { isActive: false },
        {
          where: { id: params.id },
          returning: true,
          plain: true,
        }
      );
      logger.userLogger.info(
        ' /PUT statusCode: 200 : Account disabled successfully '
      );
      return res.status(200).json({
        message: `Account was successfully disabled`,
      });
    } catch (e) {
      logger.userLogger.error(
        ` /PUT statusCode: 500 :Disabling account failed : ${e.message}`
      );
      return res.status(500).json({ error: e.message });
    }
  }

  static async enableUser({ params }, res) {
    try {
      const user = await User.findOne({ where: { id: params.id } });

      if (!user) {
        logger.userLogger.error(
          ' /PUT statusCode: 404 : Account to be anabled not found '
        );
        return res
          .status(404)
          .json({ error: 'Account to be enabled not found!' });
      }

      const enabledUser = await User.update(
        { isActive: true },
        {
          where: { id: params.id },
          returning: true,
          attributes: {
            exclude: ['password'],
          },
        }
      );
      logger.userLogger.info(
        ' /PUT statusCode: 200 : Account enabled successfully '
      );
      return res.status(200).json({
        message: `Account which belongs to ${user.name} was successfully enabled`,
        enabledUser,
      });
    } catch (e) {
      logger.userLogger.error(
        ` /PUT statusCode: 500 :Enabling account failed : ${e.message}`
      );
      return res.status(500).json({ error: e.message });
    }
  }
}

export default dis_enableController;
