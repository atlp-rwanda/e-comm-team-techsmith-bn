import db from '../../database/models/index.js';

const { user } = db;

const changeRole = async (req, res) => {
  // CATCH IDs
  const { id: userId, role } = req.params;

  try {
    // CHECK IF USER EXISTS
    const userExists = await user.findOne({ where: { id: userId } });
    if (!userExists) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    // UPDATE USER ROLE
    const updateRole = await userExists.update({
      roleId: Number(role),
    });

    // DESTRUCTURE RESPONSE TO REMOVE USER PASSWORD
    const { password, ...userDetails } = updateRole.dataValues;

    // RETURN SUCCESS RESPONSE
    return res.status(200).json({
      message: 'User updated successfully',
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default changeRole;
