import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';
import {
  newsletterSubscriptionMessageTemplate,
  nodeMail,
} from '../utils/emails.js';
import { validateEmail } from '../utils/userValidation.js';

const { subscription } = db;

class newsletterSubscribe {
  // REQUEST SUBSCRIPTION
  static async requestSubscription(req, res) {
    const { name: username, email: userEmail } = req.body;

    try {
      // VALIDATE EMAIL
      const validEmail = validateEmail(userEmail);
      if (!validEmail) {
        return res.status(400).json({
          message: 'Invalid email',
        });
      }
      // CHECK IF SUBSCRIPTION ALREADY EXISTS
      const subscriptionExists = await subscription.findOne({
        where: { email: userEmail },
      });
      if (subscriptionExists?.isSubscribed) {
        return res.status(409).json({
          message: 'Your email is already subscribed to our newsletter',
        });
      }
      // CREATE SUBSCRIPTION
      const requestSubscribe = await subscription.create({
        name: username,
        email: userEmail,
        isSubscribed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      // GENERATE TOKEN
      const token = jwt.sign({ userEmail }, process.env.USER_SECRET, {
        expiresIn: '1d',
      });

      await nodeMail(
        userEmail,
        username,
        `Welcome to the Newsletter, ${username}`,
        newsletterSubscriptionMessageTemplate,
        token
      );

      return res.status(201).json({
        message:
          'You have successfully requested to subscribe to our newsletter',
        token,
        data: requestSubscribe,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // CONFIRM SUBSCRIPTION
  static async confirmSubscription(req, res) {
    // CATCH TOKEN PASSED IN PATH
    const { token } = req.params;
    try {
      // VERIFY TOKEN
      const { userEmail } = jwt.verify(token, process.env.USER_SECRET);
      // FIND USER
      const user = await subscription.findOne({ where: { email: userEmail } });
      // CHECK IF A USER IS ALREADY SUBSCRIBED
      if (user.isSubscribed) {
        return res.status(409).send({
          message:
            'You have already confirmed your subscription to our newsletter. Enjoy the ride',
        });
      }
      // UPDATE USER
      const updatedUser = await user.update({
        isSubscribed: true,
      });
      // RETURN SUCCESS MESSAGE
      return res.status(200).json({
        ok: true,
        message: 'You have successfully subscribed to our newsletter',
        data: updatedUser,
      });
      // CATCH ERRORS
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default newsletterSubscribe;
