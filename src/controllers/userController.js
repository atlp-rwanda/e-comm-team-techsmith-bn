import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';

dotenv.config();

const { user } = db;
class userController {
  // get allusers
  static async getUsers(req, res) {
    try {
      const users = await user.findAll();
      res.status(200).json({ data: users });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  // LOGOUT
  static logoutController = async (req, res) => {
    const token = await req.headers.cookie;
    try {
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'You are not logged in',
        });
      }
      res.clearCookie(token);
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
          message: 'user not found',
        });
      }
      return res.status(200).json({
        data: userInfo,
      });
    } catch (error) {
      return error.message;
    }
  }

  // Updating a User
  static async updateUser(req, res) {
    try {
      const tokenvalue = await req.headers.cookie;
      const token = tokenvalue.split('=')[1];
      const userToken = jwt.verify(token, process.env.USER_SECRET);
      if (userToken.id) {
        const findUser = await user.findOne({ where: { id: userToken.id } });
        if (findUser) {
          const {
            name,
            email,
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
          const checkupdate = await user.update(
            {
              name,
              birthDate,
              preferredLanguage,
              preferredCurrency,
              physicalAddress,
            },
            { where: { id: userToken.id }, returning: true }
          );
          if (checkupdate) {
            res.status(200).json({
              message: 'Updated ',
              updatedUser: checkupdate,
            });
          } else {
            /* eslint-disable no-console */
            console.log('not updated');
          }
        }
      }
    } catch (error) {
      return error.message;
    }
  }

  //   Updating user password
  static async updatePass(req, res) {
    try {
      const { email, oldPassword, newPassword, confPassword } = req.body;
      // Checking if the email value provided is found in the database
      const foundUser = await user.findOne({ where: { email } });
      if (foundUser) {
        // check if the old password is correct
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
