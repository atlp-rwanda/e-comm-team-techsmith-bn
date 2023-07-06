import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENV VARIABLES
const { NODEMAILER_EMAIL_USERNAME, NODEMAILER_EMAIL_PASSWORD, PORT } =
  process.env;

// CONFIGURE HOST
const host =
  process.env.NODE_ENV === 'production'
    ? process.env.HOST
    : `http://localhost:${PORT}`;

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

/* RESET PASSWORD MESSAGE TEMPLATE */
const resetPasswordMessageTemplate = (name, token) => `
Dear ${name},
You have requested to reset your password. Please click on the link below to reset your password.
${host}/api/users/reset-password/${token}
If you did not request for a password reset, please contact our support team.
Thank you.
`;

/* NEWSLETTER SUBSCRIPTION MESSAGE TEMPLATE */

const newsletterSubscriptionMessageTemplate = (name, token) => `
Dear ${name},
You have registered for our newsletter. To make sure it is you, please click on the link below to confirm your subscription.
${host}/api/users/confirm-newsletter/${token}
If you did not request for a newsletter subscription, kindly ignore this email.
Thank you.
`;

/* TWO FACTOR AUTHENTICATION MESSAGE TEMPLATE */

const twoFAMessageTemplate = (name, token) => `
Dear ${name},
You have requested to enable two factor authentication on your account. please use the token below to confirm your identity.
${token}   
Copy and paste the token above to the input field on the page.
If you did not request for two factor authentication, please contact our support team.
Thank you.
`;

/* SENDGRID EMAIL */
// disable user MESSAGE TEMPLATE
const disableUserMessageTemplate = (name) => `
Dear ${name},
We are sorry to inform you that your account has been temporarily disabled. This may
be caused by improper conduct or other illegal transactions performed under your name.
If you believe that this is a mistake, kindly reach out to the site admin.
Thank you.
`;

// disable user MESSAGE TEMPLATE
const enableUserMessageTemplate = (name) => `
Dear ${name},
We are happy to inform you that your account has been enabled again. Make sure to
abide with proper conduct or avoid illegal transactions performed under your account name.
If you believe that this is a mistake, kindly ignore this message.
Follow this link to know mow:
https://smithT/linkToContactUs
Thank you.
`;
const productIsExpired = (name, productName) => `
Subject: Regarding Expired Product - ${productName}

Dear ${name},

I hope this email finds you well. We wanted to bring to your attention that the ${productName} you have provided to us for our app has expired.

As part of our quality assurance process, we ensure that all products used in our app are within their designated shelf life to maintain the highest standards for our users. However, the ${productName} we received from you has exceeded its expiration date.

We kindly request your assistance in providing us with an updated version of the ${productName} that is within its expiration date. This will allow us to continue providing our users with a seamless experience and maintain the integrity of our app.

We appreciate your attention to this matter and your cooperation in resolving this issue. Thank you for your prompt response.

Best regards,
`;

// DELIVERED ORDER MESSAGE TEMPLATE
const deliveredOrderMessage = (name) => `
Dear ${name},
We are please to inform you that your order is being delivered. You may expect to see it
betwee two to three business days. We really appreciate your patience.

Thank you for choosing SMITH-t-ECOMMERCE
`;

// CANCELLED ORDER MESSAGE TEMPLATE
const cancelledOrderMessage = (name) => `
Dear ${name},
We are we regret to inform you that your order was cancelled. This may be 
due to one of various reasons. We advise you to contact our team
for further inquires. We really appreciate your patience.

Thank you for choosing SMITH-t-ECOMMERCE
`;

// PAYMENT SUCCESSFUL MESSAGE TEMPLATE
const paymentSuccessfulMessage = (name, receipt) => `
Dear ${name},
  
We are happy to inform you that your payment was successful, and your order is already en route to your address. You may expect to see it between two to three business days. We really appreciate your patience.
  
You may access your receipt on the link below:
  ${receipt}
  
Thank you for choosing Techsmiths Ecommerce
  `;
const remindPasswordChangeMessage = (name) => `
  Dear ${name},
  You are recieving this email for security reason.It's been 30 days since you have changed your password,we recommend you to change it to keep your account secured.
  Thank you.
  `;

/* SENDGRID EMAIL */
const sendEmail = async (email, name, heading, messageTemplate, token) => {
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
    return error;
  }
};

/* NODEMAILER */
const nodeMail = async (email, name, heading, messageTemplate, token) => {
  try {
    const message = messageTemplate(name, token);
    const transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: NODEMAILER_EMAIL_USERNAME,
        pass: NODEMAILER_EMAIL_PASSWORD,
      },
    });
    // SET MAIL OPTIONS
    const mailOptions = {
      from: `Techsmiths Digital Team <${NODEMAILER_EMAIL_USERNAME}>`,
      to: email,
      subject: heading,
      text: message,
    };
    // SEND EMAIL
    await transporter
      .sendMail(mailOptions)
      // eslint-disable-next-line no-console
      .then((result) => result);
  } catch (error) {
    // eslint-disable-next-line no-console
    return error;
  }
};

export {
  sendEmail,
  registerMessageTemplate,
  resetPasswordMessageTemplate,
  newsletterSubscriptionMessageTemplate,
  enableUserMessageTemplate,
  disableUserMessageTemplate,
  deliveredOrderMessage,
  cancelledOrderMessage,
  twoFAMessageTemplate,
  nodeMail,
  productIsExpired,
  paymentSuccessfulMessage,
  remindPasswordChangeMessage,
};
