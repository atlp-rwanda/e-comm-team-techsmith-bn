import jwt from 'jsonwebtoken';
import { getCookie, getToken } from '../utils/cookies';

const logger = require('../controllers/logger');

const checkIsLoggedIn = (req, res, next) => {
  try {
    const cookie = getCookie(req);
    // CHECK IF COOKIE EXISTS
    if (!cookie) {
      logger.userLogger.error(
        '/POST statusCode: 401 : Unauthorized access, Login required'
      );
      return res
        .status(401)
        .send({ message: 'Please log in to perform this action' });
    }
    // GET TOKEN FROM COOKIE
    const token = getToken(req);
    // eslint-disable-next-line no-console
    // IF NOT TOKEN IS FOUND
    if (!token) {
      logger.userLogger.error(
        '/POST statusCode: 400 : Unauthorized access, token required'
      );
      return res
        .status(400)
        .send({ message: 'Could not verify your authentication' });
    }
    // GET USER ID AND ROLE FROM TOKEN
    const { id, role } = jwt.verify(token, process.env.USER_SECRET);

    // RETURN USER ID AND ROLE
    res.locals = { id, role };
    // PROCEED IF USER IS ADMIN
    next();
  } catch (error) {
    logger.userLogger.error(
      `/POST statusCode: 500 : Check if user logged in failed:${error.message}`
    );
    return res.status(500).json({ message: error.message });
  }
};
export default checkIsLoggedIn;
