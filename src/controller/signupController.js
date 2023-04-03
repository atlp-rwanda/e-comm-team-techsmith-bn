import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';
import { validateEmail, validatePassword } from '../utils/userValidation.js';
import sendEmail from '../utils/emails.js';

const { user } = db;
/* eslint-disable no-console */
console.log('user', user);

const { USER_SECRET: secret } = process.env;

//  REGISTER USER
const registerUser = async (req, res) => {
  // TOKEN
  let token = null;
  try {
    const { name: username, email: userEmail, password, role } = req.body;
    /* es-lint-disable no-console */
    console.log(userEmail);
    const hashedPassword = await bcrypt.hash(password, 10);
    // CHECK IF USER EXISTS
    const userExists = await user.findOne({ where: { email: userEmail } });
    if (userExists) {
      return res.status(409).json({
        message: 'User already exists',
        user: userExists,
      });
    }
    // VALIDATE USER EMAIL
    const validEmail = validateEmail(userEmail);
    // VALIDATE USER PASSWORD
    const validPassword = validatePassword(password);
    // LOG VALIDATION RESULTS
    console.log(validPassword, validEmail);
    /* REGISTER USER IF EMAIL AND PASSWORD ARE VALID */
    if (validEmail && validPassword) {
      const newUser = await user.create({
        name: username,
        email: userEmail,
        password: hashedPassword,
        roleId: role,
        isActive: true,
      });
      // CREATE TOKEN
      token = jwt.sign({ id: userEmail }, secret, { expiresIn: 604800 });
      // SET TOKEN IN COOKIE
      res.cookie('Authorized', token, { httpOnly: true, maxAge: 604800 });
      // SEND EMAIL
      await sendEmail(userEmail, username, 'Welcome to the team', res);
      // RETURN USER
      const { password: userPassword, ...userDetails } = newUser.dataValues;
      return res.status(201).json({
        message: 'User created successfully',
        authorization: token,
        user: userDetails,
      });
    }
    /* RETURN ERROR IF EMAIL OR PASSWORD IS INVALID */
    // INVALID EMAIL
    if (!validEmail) {
      return res.status(400).json({
        message: validEmail,
      });
    }
    // INVALID PASSWORD
    if (!validPassword) {
      return res.status(400).json({
        message: validPassword,
      });
    }
  } catch (error) {
    // CATCH ERROR
    return res.status(500).json({
      error,
    });
  }
};

export default registerUser;
