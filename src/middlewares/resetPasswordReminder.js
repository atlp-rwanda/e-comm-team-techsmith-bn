import { Op } from 'sequelize';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import db from '../../database/models/index.js';
import { remindUserMessageTemplate } from '../utils/emails.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL_USERNAME,
        pass: process.env.NODEMAILER_EMAIL_PASSWORD,
    },
});

function remindUsersToChangePassword() {
    cron.schedule('* * * * *', async(req, res) => {
        try {
            const { user } = db;
            const usersToRemind = await user.findAll({
                where: {
                    passcodeModifiedAt: {
                        [Op.lt]: new Date(Date.now() - 60 * 1000), // RETRIEVE ALL USERS WHOSE LASL UPDATE PASSWORD TIME IS GREATER THAN 60DAYS
                    },
                },
                attributes: ['email', 'name'],
            });
            const emailsAndNames = usersToRemind.map(({ email, name }) => ({
                email,
                name,
            }));
            console.log('*****');
            console.log(emailsAndNames);
            // console.log(emailsAndNames[0].email);
            // SEND EMAILS TO THESE USERS TO RESET THEIR PASSWORD
            emailsAndNames.forEach(async(element) => {
                try {
                    const mailOptions = {
                        from: process.env.RESET_EMAIL,
                        to: element.email,
                        subject: 'Change password',
                        text: remindUserMessageTemplate(element.name),
                    };

                    const message = await transporter.sendMail(mailOptions);
                    if (!message.accepted.length) {
                        throw new Error('Failed to send email');
                    }

                    return res.status(200).json({ message: 'email sent' });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'email failed to send' });
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    });
}
export default remindUsersToChangePassword;