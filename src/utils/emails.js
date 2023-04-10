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
    process.env.NODE_ENV === 'production' ?
    process.env.HOST :
    `http://localhost:${PORT}`;

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

You have requested to enable two factor authentication on your account. Please click on the link below to confirm your request.

${host}/api/users/login/${token}

If you did not request for two factor authentication, please contact our support team.

Thank you.
`;

/* SENDGRID EMAIL */
const sendEmail = async(email, name, heading, messageTemplate, token) => {
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
const nodeMail = async(email, name, heading, messageTemplate, token) => {
    try {
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
            text: messageTemplate(name, token),
        };
        // SEND EMAIL
        /* eslint-disable */
        await transporter
            .sendMail(mailOptions)
            .then((message) => console.log(message));
    } catch (error) {
        return error;
    }
};

export {
    sendEmail,
    registerMessageTemplate,
    resetPasswordMessageTemplate,
    newsletterSubscriptionMessageTemplate,
    twoFAMessageTemplate,
    nodeMail
};