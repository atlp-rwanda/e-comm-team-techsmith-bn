import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { getCookie, getToken } from '../utils/cookies.js';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIRONMENT VARIABLES
const { USER_SECRET: secret } = process.env;
const logger = require('../controllers/logger');

const isBuyer = (req, res, next) => {
  // CATCH COOKIE FROM REQUEST
  const cookie = getCookie(req);

  try {
    // CHECK IF COOKIE IS NOT VALID
    if (!cookie) {
      logger.userLogger.error(
        '/POST statusCode: 401 : Unauthorized access, Login required'
      );
      return res.status(401).json({
        message:
          'Unauthorized access, please double-check if you are logged in',
      });
    }

    // EXTRACT TOKEN FROM COOKIE
    const token = getToken(req);

    // CHECK IF TOKEN IS NOT VALID
    if (!token) {
      logger.userLogger.error(
        '/POST statusCode: 401 : Unauthorized access,token required'
      );
      return res.status(401).json({
        message:
          'Unauthorized access,  please double-check if you are logged in',
      });
    }

    // VERIFY TOKEN
    const { id, role } = jwt.verify(token, secret);

    // VERIFY IF USER IS NOT A BUYER
    if (role !== 3) {
      logger.userLogger.error(
        '/POST statusCode: 403 : Forbidden access,Only buyer is allowed to perform the action'
      );
      return res.status(403).json({
        message:
          'Forbidden access, only buyers are allowed to perform this action',
      });
    }

    // PASSING THE USER ID IN THE CONTROLLER
    res.locals = { id, role };

    // RETURN NEXT
    return next();
  } catch (error) {
    logger.userLogger.error(
      `/POST statusCode: 500 : verifyIsBuyer failed ${error.message}`
    );
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default isBuyer;
