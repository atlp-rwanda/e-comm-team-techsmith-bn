import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

// CONFIGURE DOTENV
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const messageTemplate = (name) => `
Dear ${name},

You have successfully registered on our platform. We are glad to have you on board.

Below is the link to our platform. You can login with your email and password.

https://www.example.com

Thank you for using our service.
`;

const sendEmail = async (email, name, heading, res) => {
  try {
    const message = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: heading,
      text: messageTemplate(name),
    };
    // SEND EMAIL
    await sgMail.send(message);
    // RETURN SUCCESS
    /* eslint-disable no-console */
    console.log(`Email sent to ${name}`);
  } catch (error) {
    return res.status(500).json({
      status: error,
    });
  }
};

export default sendEmail;

/*
## What does this PR do?

This PR helps to send the user a verification email after successful registration.

## Description of Task to be completed?

**GIVEN** a user registers with our application successfully, 
 */
