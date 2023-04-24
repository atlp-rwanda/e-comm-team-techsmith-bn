import db from '../../database/models/index.js';

// LOAD MODELS FROM DATABASE
const { user } = db;

const isActive = async (req, res, next) => {
  try {
    // GET EMAIL FROM REQUEST BODY
    const { email } = req.body;
    // eslint-disable-next-line no-console
    console.log(email);
    const userExist = await user.findOne({
      where: { email },
    });
    // IF USER DOES NOT EXISTS
    if (!userExist) {
      return res.status(404).json({
        message: 'User does not exist',
      });
    }
    // Passing the userId in the body for create or getProducts of logged user
    res.locals = { email };
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default isActive;
