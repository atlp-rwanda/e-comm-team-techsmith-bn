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
    const findUser = await user.findOne({ where: { userEmail } });
    // console.log(findUser.password);
    // console.log(hashedPassword);
    // console.log(password);
    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (findUser) {
      console.log(checkPassword);
      if (checkPassword) {
        const payload = {
          id: findUser.email,
        };
        const token = jwt.sign(payload, secret, { expiresIn: 604800 });
        res.cookie('loginToken', token, {
          httpOnly: true,
          maxAge: 604800,
          path: '/',
        });
        return res.status(200).json({
          message: 'Successfull Login!!',
          data: token,
        });
      }

      return res.status(401).json({
        message: 'Wrong Credentials!!',
      });
    }

    return res.status(401).json({
      message: 'Wrong Credentials!! email',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default loginController;
