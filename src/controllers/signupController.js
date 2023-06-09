import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';
import { validateEmail, validatePassword } from '../utils/userValidation.js';
import { registerMessageTemplate, nodeMail } from '../utils/emails.js';

const { user } = db;

const { USER_SECRET: secret } = process.env;
const logger = require('./logger');
//  REGISTER USER
const registerUser = async (req, res) => {
  // TOKEN
  let token = null;
  try {
    const {
      name: username,
      email: userEmail,
      password,
      role,
      gender: userGender,
      birthDate: userBirthDate,
      preferredLanguage: userPreferredLanguage,
      preferredCurrency: userPreferredCurrency,
      physicalAddress: userPhysicalAddress,
      telephone: userTelephone,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    // CHECK IF USER EXISTS
    const userExists = await user.findOne({ where: { email: userEmail } });
    if (userExists) {
      const { password: userPassword, ...userDetails } = userExists.dataValues;
      return res.status(409).json({
        message: 'User already exists',
        user: userDetails,
      });
    }
    // VALIDATE USER EMAIL
    const validEmail = validateEmail(userEmail);
    // VALIDATE USER PASSWORD
    const validPassword = validatePassword(password);
    // LOG VALIDATION RESULTS
    /* REGISTER USER IF EMAIL AND PASSWORD ARE VALID */
    if (validEmail && validPassword) {
      const newUser = await user.create({
        name: username,
        email: userEmail,
        password: hashedPassword,
        roleId: role,
        isActive: true,
        gender: userGender,
        passcodeModifiedAt: Date.now(),
        birthDate: userBirthDate || new Date(),
        preferredLanguage: userPreferredLanguage || 'rw',
        preferredCurrency: userPreferredCurrency || 'RWF',
        physicalAddress: userPhysicalAddress || 'Rwanda',
        telephone: userTelephone || '0788888888',
      });
      // Create token
      token = jwt.sign({ id: newUser.id, role }, secret, {
        expiresIn: 604800,
      });
      // Set token in cookie
      res.cookie('Authorized', token, { httpOnly: true, maxAge: 604800 });
      //  Send email
      await nodeMail(
        userEmail,
        username,
        'Welcome to the team',
        registerMessageTemplate,
        token
      );
      //  Return User
      const { password: userPassword, ...userDetails } = newUser.dataValues;
      logger.userLogger.info(
        '/POST statusCode: 201 : User account created successfully '
      );
      return res.status(201).json({
        ok: true,
        message: 'User created successfully',
        Authorization: token,
        user: userDetails,
      });
    }
    /*  Retrun error if email or password is invalid */
    // Invalid Email
    if (!validEmail) {
      logger.userLogger.error(
        '/POST statusCode: 400 : Invalid email provided '
      );
      return res.status(400).json({
        message: 'Invalid email',
      });
    }
    // INVALID PASSWORD
    if (!validPassword) {
      logger.userLogger.error(
        '/POST statusCode: 400 : Invalid password provided '
      );
      return res.status(400).json({
        message: 'Invalid password',
      });
    }
  } catch (error) {
    // CATCH ERROR
    logger.userLogger.error(
      `/POST statusCode: 500 : Creating user account  failed: ${error.message} `
    );
    return res.status(500).json({
      message: error.message,
      ok: false,
    });
  }
};

export default registerUser;
