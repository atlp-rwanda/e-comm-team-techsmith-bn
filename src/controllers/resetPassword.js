import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import db, { user as User } from '../../database/models';
import { nodeMail, remindPasswordChangeMessage } from '../utils/emails';

const logger = require('./logger');

const { Op } = Sequelize;

dotenv.config();

// Define the nodemailer transporter object
const transporter = nodemailer.createTransport({
  service: process.env.RESET_EMAIL_SERVICE,
  auth: {
    user: process.env.RESET_EMAIL,
    pass: process.env.RESET_PASSWORD,
  },
});
// Send the password reset email
async function sendResetEmail(user) {
  const token = jwt.sign({ email: user.email }, process.env.USER_SECRET, {
    expiresIn: '1h',
  });
  const newToken = token.replace(/\./g, '-');
  const resetLink = `${process.env.HOST}/reset-password/${newToken}`;
  const mailOptions = {
    to: user.email,
    from: `ATLP E-commerce <${process.env.RESET_EMAIL}>`,
    subject: 'Your App Password Reset',
    text: `Hi ${user.name},\n\nYou are receiving this email because we received a password reset request for your account.
    \n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetLink}\n If
     you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  await transporter.sendMail(mailOptions);
}

function verifyResetToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.USER_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded.email);
      }
    });
  });
}
async function resetPassword(email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const foundUser = await User.findOne({ where: { email } });

  await foundUser.update({
    password: hashedPassword,
    passcodeModifiedAt: Date.now(),
  });
}
async function requestReset(req, res) {
  const { email } = req.body;
  const foundUser = await User.findOne({ where: { email } });
  if (!foundUser) {
    logger.userLogger.error(
      '/PUT statusCode: 404 : Email TO RESET password not found'
    );
    return res.status(404).json({
      message: 'Email not found',
    });
  }
  const token = jwt.sign({ email }, process.env.USER_SECRET, {
    expiresIn: '1h',
  });
  res.cookie('token', token, { httpOnly: true, maxAge: 3600, path: '/' });
  await foundUser.save();
  await sendResetEmail(foundUser);
  logger.userLogger.error('/PUT statusCode: 200 : Password reset email sent');
  return res.status(200).json({ message: 'Password reset email sent' });
}
async function processReset(req, res) {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const email = await verifyResetToken(token);
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      logger.userLogger.error(
        '/PUT statusCode: 404 : Email to reset password not found'
      );
      return res.status(404).json({
        error: req.t('error'),
      });
    }

    await resetPassword(email, password);
    logger.userLogger.info(
      '/PUT statusCode: 200 : Password reset completed successfully'
    );
    return res.status(200).json({
      ok: true,
      message: 'Password reset successfully',
    });
  } catch (err) {
    logger.userLogger.error('/PUT statusCode: 400 : Invalid token provided');
    return res.status(400).json({
      message: 'Invalid token',
    });
  }
}
async function checkExpired(req, res) {
  try {
    const { user } = db;
    // Retrieve users whose last password update time is greater than 30 days
    const usersToRemind = await user.findAll({
      where: {
        passcodeModifiedAt: {
          [Op.lt]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
      attributes: ['email', 'name'],
    });
    const emailsAndNames = usersToRemind.map(({ email, name }) => ({
      email,
      name,
    }));

    // Send email to each user in the array of emailsAndNames
    emailsAndNames.forEach(async (element) => {
      await nodeMail(
        element.email,
        element.name,
        'Update your password',
        remindPasswordChangeMessage
      );
    });
    return res.json({
      message: 'Emails were sent successfully',
      usersToRemind: emailsAndNames,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
export { requestReset, processReset, checkExpired };
