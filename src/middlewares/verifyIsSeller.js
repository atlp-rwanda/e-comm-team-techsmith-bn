import jwt from 'jsonwebtoken';
import getToken from '../utils/cookies.js';

// LOAD ENVIRONMENT VARIABLES
const { USER_SECRET: secret } = process.env;

const isSeller = async (req, res, next) => {
  try {
    // GET EMAIL FROM REQUEST BODY
    const token = getToken(req);
    // CHECK IF TOKEN IS NOT VALID
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized access',
      });
    }
    // GET USER ID FROM TOKEN
    const { id, role } = jwt.verify(token, secret);
    // CHECK IF USER IS NOT A SELLER
    if (role !== 2) {
      return res.status(403).json({
        message: 'Unauthorized access',
      });
    }
    // Passing the userId in the body for create or getProducts of logged user
    res.locals = { id, role };
    next();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default isSeller;
