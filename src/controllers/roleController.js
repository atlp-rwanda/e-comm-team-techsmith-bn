import db from '../../database/models/index.js';

const { user } = db;
const logger = require('./logger');

const changeRole = async (req, res) => {
  const { id: userId, role } = req.params;

  try {
    const userExists = await user.findOne({ where: { id: userId } });
    if (!userExists) {
      logger.userLogger.error('/PUT statusCode: 404 : User not found');
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const updateRole = await userExists.update({
      roleId: Number(role),
    });

    const { password, ...userDetails } = updateRole.dataValues;
    logger.userLogger.error(
      '/PUT statusCode: 200 : User role updated successfully'
    );
    return res.status(200).json({
      message: 'User updated successfully',
      data: userDetails,
    });
  } catch (error) {
    logger.userLogger.error(
      `/PUT statusCode: 500 : Changing user role failed: ${error.message}`
    );
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default changeRole;
