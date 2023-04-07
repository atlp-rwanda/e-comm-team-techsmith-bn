import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

// CONFIGURE DOTENV
dotenv.config();

// CONFIGURE HOST
const host =
  process.env.NODE_ENV === 'production'
    ? process.env.HOST
    : `http://localhost:5000`;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// MESSAGE TEMPLATES
// REGISTER MESSAGE TEMPLATE
const registerMessageTemplate = (name) => `
Dear ${name},

You have successfully registered on our platform. We are glad to have you on board.

Below is the link to our platform. You can login with your email and password.

${host}/users/login

Thank you for using our service.
`;

// RESET PASSWORD MESSAGE TEMPLATE
const resetPasswordMessageTemplate = (name, token) => `
Dear ${name},

You have requested to reset your password. Please click on the link below to reset your password.

${host}/api/users/reset-password/${token}

If you did not request for a password reset, please contact our support team.

Thank you.
`;

// NEWSLETTER SUBSCRIPTION MESSAGE TEMPLATE
const newsletterSubscriptionMessageTemplate = (name, token) => `
Dear ${name},

You have registered for our newsletter. To make sure it is you, please click on the link below to confirm your subscription.

${host}/api/users/confirm-newsletter/${token}

If you did not request for a newsletter subscription, kindly ignore this email.

Thank you.
`;

const sendEmail = async (email, name, heading, res, messageTemplate, token) => {
  try {
    const message = {
      to: email,
      from: process.env.SENDGRID_EMAIL,
      subject: heading,
      text: messageTemplate(name, token),
    };
    // SEND EMAIL
    await sgMail.send(message);
    // RETURN SUCCESS MESSAGE

  } catch (error) {
    console.log(error);
  }
};

export {
  sendEmail,
  registerMessageTemplate,
  resetPasswordMessageTemplate,
  newsletterSubscriptionMessageTemplate,
};
