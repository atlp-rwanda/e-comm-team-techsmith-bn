import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
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
      console.log('no one');
      return res.status(404).json({
        message: 'User does not exists or make sure you are logged in',
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
export default userController;
