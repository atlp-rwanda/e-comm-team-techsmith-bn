import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getToken } from '../utils/cookies';

dotenv.config();
const logger = require('../controllers/logger');
// verify if the user is the admin using the token in cookies
const isAdmin = async (req, res, next) => {
  try {
    const { cookie, authorization } = req.headers;
    // IF NO COOKIE IS FOUND
    if (!cookie && !authorization) {
      logger.userLogger.error(
        '/POST statusCode: 401 : Unauthorized access, Login required'
      );
      return res
        .status(401)
        .send({ message: 'Please log in to perform this action' });
    }
    // EXTRACT TOKEN FROM COOKIE
    const token = getToken(req);
    // IF NO TOKEN IS FOUND
    if (!token) {
      logger.userLogger.error(
        '/POST statusCode: 401 : Unauthorized access, token required'
      );
      return res
        .status(400)
        .send({ message: 'Could not verify your authentication' });
    }
    // VERIFY TOKEN
    const { id, role } = jwt.verify(token, process.env.USER_SECRET);
    // IF USER IS NOT ADMIN
    if (role !== 1) {
      logger.userLogger.warn(
        '/POST statusCode: 403 : Forbidden access,Only admin is allowed to perform the action'
      );
      return res.status(403).send({
        message:
          'Unauthorized! Only site admin is allowed to perform this action.',
      });
    }
    // RETURN USER ID AND ROLE
    res.locals = { id, role };
    // PROCEED IF USER IS ADMIN
    next();
  } catch (e) {
    logger.userLogger.error(
      `/POST statusCode: 500 : verifyIsBuyer failed ${e.message}`
    );
    next();
  }
};
export default isAdmin;
