import { Op } from 'sequelize';
import cron from 'node-cron';
import db from '../../database/models/index.js';
import { remindUserMessageTemplate, nodeMail } from '../utils/emails.js';

function remindUsersToChangePassword(req, res) {
    try {
        cron.schedule('* * * * *', async() => {
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
            //SEND EMAIL TO EACH USER IN THE ARRAY OF emailsAndNames
            emailsAndNames.forEach(async(element) => {
                await nodeMail(
                    element.email,
                    element.name,
                    'Update your password',
                    remindUserMessageTemplate
                );
            });
            return res.json({ message: 'Emails were sents succesfully' });
        });
    } catch (error) {
        console.log(error.message);
    }
};
export default remindUsersToChangePassword;