import db from '../../database/models';

const { user: User } = db;

export default async (req, res, next) => {
  const { email } = req.body;

  try {
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return res
        .status(404)
        .send({ message: 'Account does not exist. Please Signup!' });
    }
    if (findUser.isActive === false) {
      return res.status(401).send({ message: 'This Account is disabled' });
    }

    next();
  } catch (e) {
    return res.status(500).send({ message: e.message });
  }
};
