import jwt from 'jsonwebtoken';
import db from '../../database/models/index.js';

const isActive = async (req, res, next) => {
  try {
    const { user } = db;
    const token = req.headers.cookie.split('=')[1];
    const decodedToken = jwt.verify(token, process.env.USER_SECRET);
    const { id } = await user.findOne({
      where: { id: decodedToken.id },
    });

    const activeUser = await user.findOne({
      where: { id, isActive: true },
    });
    if (!activeUser) {
      return res.status(401).json({
        message:
          'Your account is temporary disabled, contact  the support team',
      });
    }
    // Passing the userId in the body for create or getProducts of logged user
    req.id = id;
    next();
  } catch (error) {
    res.status(500).json({
      message: 'server error',
    });
  }
};

export default isActive;
