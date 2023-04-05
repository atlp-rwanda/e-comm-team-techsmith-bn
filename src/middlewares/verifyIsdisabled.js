import db from '../../database/models';

const { user: User } = db;

export default async (req, res, next) => {
  const { email } = req.body;

  try {
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return res
        .status(400)
        .send({ message: 'Account does not exist. Please Signup!' });
    }
    if (findUser.isActive === false) {
      return res.status(302).send({ message: 'This Account is desabled' });
    }

    next();
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .send({ message: 'Error in checking the Account status' });
  }
};
