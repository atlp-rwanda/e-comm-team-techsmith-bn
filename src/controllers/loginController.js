import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../database/models/index.js';

dotenv.config();
const { USER_SECRET: secret } = process.env;

const { user } = db;

const loginController = async (req, res) => {
  const { email: userEmail, password } = req.body;

  try {
    const findUser = await user.findOne({ where: { email: userEmail } });
    if (!findUser) {
      return res.status(404).json({
        message: 'User not found',
      });
    }
    const checkPassword = await bcrypt.compare(password, findUser.password);
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
};

export default loginController;
