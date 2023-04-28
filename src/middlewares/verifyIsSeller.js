import jwt from 'jsonwebtoken';
import { getToken } from '../utils/cookies.js';
import logger from '../controllers/logger.js';

// LOAD ENVIRONMENT VARIABLES
const { USER_SECRET: secret } = process.env;

const isSeller = async (req, res, next) => {
  try {
    // GET EMAIL FROM REQUEST BODY
    const token = getToken(req);
    // CHECK IF TOKEN IS NOT VALID
    if (!token) {
      logger.userLogger.error(
        '/POST statusCode: 401 : Unathorised access, Login required'
      );
      return res.status(401).json({
        message: 'Unauthorized access. Please login!',
      });
    }
    // GET USER ID FROM TOKEN
    const { id, role } = jwt.verify(token, secret);
    // CHECK IF USER IS NOT A SELLER
    if (role !== 2) {
      logger.userLogger.error(
        '/POST statusCode: 403 : Unathorised user need to access a route'
      );
      return res.status(403).json({
        message:
          'Unauthorized access. Only seller is allowed to perform this action!',
      });
    }
    // Passing the userId in the body for create or getProducts of logged user
    res.locals = { id, role };
    next();
  } catch (error) {
    logger.userLogger.error(
      `/POST statusCode: 500 : Login failed ${error.message} `
    );
    res.status(500).json({
      message: error.message,
    });
  }
};

export default isSeller;
