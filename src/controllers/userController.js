import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from '../../database/models/index.js';

// CONFIG DOTENV
dotenv.config();

// LOAD MODELS FROM DATABASE
const { user } = db;

/* USER CONTROLLER */
class userController {
  // LOGOUT
  static logoutController = async (req, res) => {
    const { cookie } = req.headers;
    try {
      if (!cookie) {
        return res.status(401).json({
          success: false,
          message: 'You are not logged in',
        });
      }
      res.clearCookie(cookie);
      res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

  //  Getting a user by id
  static async getUser(req, res) {
    try {
      const { id } = req.params;
      const userInfo = await user.findOne({ where: { id } });
      if (!userInfo) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      // FILTER PASSWORD FROM USER RESPONSE
      const { password: userPassword, ...userDeatils } = userInfo;
      // RETURN SUCCESS MESSAGE
      return res.status(200).json({
        ok: true,
        data: userDeatils,
      });
      // CATCH ERRORS
    } catch (error) {
      return error.message;
    }
  }

  // Update User
  static async updateUser(req, res) {
    try {
      const { id } = res.locals;
      if (id !== Number(req.params.id)) {
        return res.status(401).json({
          message: 'You are only allowed to interact with your profile',
        });
      }
      if (id) {
        const findUser = await user.findOne({ where: { id } });
        if (findUser) {
          const {
            name,
            email,
            gender,
            birthDate,
            preferredLanguage,
            preferredCurrency,
            physicalAddress,
          } = req.body;
          if (email) {
            return res.status(403).json({
              message: 'You are not authorized to update your email',
            });
          }
          const checkUpdate = await user.update(
            {
              name,
              gender,
              birthDate,
              preferredLanguage,
              preferredCurrency,
              physicalAddress,
            },
            { where: { id }, returning: true, new: true }
          );
          const { password: userPassword, ...userDetails } = checkUpdate[1][0];
          if (checkUpdate) {
            return res.status(200).json({
              ok: true,
              message: 'Updated successfully',
              updatedUser: userDetails,
            });
          }
          return res.status(400).json({
            ok: false,
            message: 'Sorry, Update failed!',
            updatedUser: checkUpdate,
          });
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  //   Update user password
  static async updatePass(req, res) {
    try {
      const { email, oldPassword, newPassword, confPassword } = req.body;
      // Checking if the email value provided is found in the database
      const foundUser = await user.findOne({ where: { email } });
      if (foundUser) {
        // Check if the old password is correct
        const checkPassword = await bcrypt.compare(
          oldPassword,
          foundUser.password
        );

        if (checkPassword) {
          if (newPassword === confPassword) {
            const hashNewPassword = await bcrypt.hash(newPassword, 10);
            await user.update(
              { password: hashNewPassword },
              {
                where: {
                  email,
                },
              }
            );
            return res.status(200).json({
              message: 'Password updated succesfully',
            });
          }
          return res.status(401).json({
            message: 'Password do not match',
          });
        }
        return res.status(401).json({
          message: 'Provide the correct password in the old password field',
        });
      }
      return res.status(404).json({
        message: 'User does not exists or make sure you are logged in',
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default userController;
