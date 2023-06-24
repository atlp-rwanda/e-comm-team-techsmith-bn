import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const { NODEMAILER_EMAIL_USERNAME, NODEMAILER_EMAIL_PASSWORD } = process.env;

const contactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailTransporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: NODEMAILER_EMAIL_USERNAME,
      pass: NODEMAILER_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const emailMessage = `
  
  <strong>Name</strong>: ${name} <br><br>
  <strong>Email</strong>: ${email} <br>
  <strong>Phone</strong>: ${phone} <br>

  <h3>Message:</h3>

  <p>${message}</p>
  `;

  const mailDetails = {
    from: `Techsmiths Communications Team <${NODEMAILER_EMAIL_USERNAME}>`,
    sender: email,
    to: 'princeelysee@gmail.com',
    subject: `You have a new contact form submission from ${name}.`,
    html: emailMessage,
  };

  mailTransporter.sendMail(mailDetails, (err) => {
    if (err) {
      res.json({
        message: err.message,
      });
    } else {
      res.json({
        message: 'Email Sent',
      });
    }
  });
};

export default contactForm;
