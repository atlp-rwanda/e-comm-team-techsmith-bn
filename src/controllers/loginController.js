import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
import dotenv from 'dotenv';
import db from '../../database/models/index.js';
import { nodeMail, twoFAMessageTemplate } from '../utils/emails.js';

dotenv.config();
const { USER_SECRET: secret } = process.env;
const logger = require('./logger');

const { user, role } = db;

class loginController {
  // NORMAL LOGIN
  static async userLogin(req, res) {
    const { email: userEmail, password } = req.body;
    try {
      // CHECK IF USER EXISTS
      const findUser = await user.findOne({
        where: { email: userEmail },
        include: {
          model: role,
          as: 'role',
          attributes: ['name'],
        },
      });
      const lastUpdatedPassword = findUser.passcodeModifiedAt;
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      // IF USER DOES NOT EXIST
      if (!findUser) {
        logger.userLogger.error(' /GET statusCode: 404 : User not found');
        return res.status(404).json({
          message: 'User not found',
        });
      }

      const checkPassword = await bcrypt.compare(password, findUser.password);

      // IF USER IS A SELLER AND PASSWORD IS CORRECT

      if (checkPassword && findUser.roleId === 2) {
        const token = speakeasy.hotp({
          secret,
          counter: 45,
        });
        await nodeMail(
          findUser.email,
          findUser.name,
          'Complete two factor authentication to continue',
          twoFAMessageTemplate,
          token
        );
        res.cookie('2FA', token, {
          httpOnly: true,
          maxAge: 3600,
        });
        logger.userLogger.warn(' /POST 202: Account verification');
        return res.status(202).json({
          message: 'Please check your email to verify your continue login',
          token,
        });
      }
      // IF USER IS NOT A SELLER, LOG THEM IN AND RETURN A COOKIE
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

        if (
          lastUpdatedPassword > thirtyDaysAgo &&
          lastUpdatedPassword !== null
        ) {
          logger.userLogger.info(' /POST 200: Successful log in');
          return res.status(200).json({
            message: 'You have logged in successfully',
            Authorization: token,
            user: findUser,
          });
        }
        logger.userLogger.info(
          ' /POST 200: Successful log in, but password needs to be changed'
        );
        return res.status(200).json({
          message:
            'You have logged in successfully, but you need to change your password',
          Authorization: token,
          changePassword: true,
          user: userDetails,
        });
      }
      logger.userLogger.error(' /POST statusCode: 400 : Invalid credentials');
      return res.status(400).json({
        message: 'Email or password not valid',
      });
    } catch (error) {
      logger.userLogger.error(
        ` /POST statusCode : 500 : Login failed =>${error.message}`
      );
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // TWO FACTOR AUTHENTICATION
  static async twoFAController(req, res) {
    const { token } = req.params;
    const { email } = req.query;
    try {
      if (!token) {
        logger.userLogger.info(' /POST statusCode : 400  Token expired');
        return res.status(400).json({
          message: 'Token may have expired. Please login again',
        });
      }
      const validated = speakeasy.hotp.verify({
        secret,
        counter: 45,
        token,
        window: 5,
      });

      if (!validated) {
        logger.userLogger.info(' /POST statusCode : 400  Invalid token');
        return res.status(400).json({
          message: 'Invalid token',
          validated,
        });
      }

      // CHECK IF USER EXISTS
      const findUser = await user.findOne({
        where: { email },
        include: {
          model: role,
          as: 'role',
          attributes: ['name'],
        },
        exclude: ['password'],
      });

      const { password: userPassword, ...userDetails } = findUser.dataValues;

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

      // RETURN USER DETAILS
      const lastUpdatedPassword = findUser.passcodeModifiedAt;
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      if (lastUpdatedPassword > thirtyDaysAgo && lastUpdatedPassword !== null) {
        logger.userLogger.info(' /GET statusCode: 200 : log in successfully');
        return res.status(200).json({
          message: 'Login successfully',
          Authorization: userToken,
          user: userDetails,
        });
      }

      logger.userLogger.info(
        ' /POST 200: Successful log in, but password needs to be changed'
      );
      return res.status(200).json({
        message:
          'You have logged in successfully, but you need to change your password',
        Authorization: userToken,
        changePassword: true,
        user: findUser,
      });
    } catch (error) {
      logger.userLogger.error(` statuCode: 500 : 2FA failed -${error.message}`);
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default loginController;
