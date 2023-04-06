import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import { nodeMail, twoFAMessageTemplate } from '../utils/emails.js';

dotenv.config();
const { USER_SECRET: secret } = process.env;

const { user } = db;

class loginController {
  // NORMAL LOGIN
  static async userLogin(req, res) {
    const { email: userEmail, password } = req.body;

    try {
      // CHECK IF USER EXISTS
      const findUser = await user.findOne({ where: { email: userEmail } });
      // IF USER DOES NOT EXIST
      if (!findUser) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
      const checkPassword = await bcrypt.compare(password, findUser.password);
      // IF USER IS A SELLER AND PASSWORD IS CORRECT
      if (checkPassword && findUser.roleId === 2) {
        const token = jwt.sign({ email: findUser.email }, secret, {
          expiresIn: '1h',
        });
        await nodeMail(
          findUser.email,
          findUser.name,
          'Complete two factor authentication',
          twoFAMessageTemplate,
          token
        );
        res.cookie('2FA', token, {
          httpOnly: true,
          maxAge: 3600,
        });
        return res.status(202).json({
          message: 'Please check your email to verify your account',
          token,
        });
      }
      if (checkPassword) {
        const payload = {
          id: findUser.id,
          role: findUser.roleId,
        };
        const token = jwt.sign(payload, secret, { expiresIn: 604800 });
        res.cookie('Authorized', token, {
          httpOnly: true,
          maxAge: 604800,
          path: '/',
        });
        const { password: userPassword, ...userDetails } = findUser.dataValues;
        return res.status(200).json({
          message: 'You have logged in successfully',
          Authorization: token,
          user: userDetails,
        });
      }

      return res.status(400).json({
        message: 'Email or password not valid',
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // TWO FACTOR AUTHENTICATION
  static async twoFAController(req, res) {
    const { token } = req.params;
    try {
      if (!token) {
        return res.status(400).json({
          message: 'Token may have expired. Please login again',
        });
      }
      /* eslint-disable */
      console.log(token);
      const { email } = jwt.verify(token, secret);
      // CHECK IF USER EXISTS
      const findUser = await user.findOne({ where: { email } });
      const payload = {
        id: findUser.id,
        role: findUser.roleId,
      };
      // GENERATE TOKEN
      const userToken = jwt.sign(payload, secret, { expiresIn: 604800 });
      // SET COOKIE
      res.cookie('Authorized', userToken, {
        httpOnly: true,
        maxAge: 604800,
      });
      const { password: userPassword, ...userDetails } = findUser.dataValues;
      // RETURN USER DETAILS
      return res.status(200).json({
        message: 'You have logged in successfully',
        Authorization: userToken,
        user: userDetails,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default loginController;