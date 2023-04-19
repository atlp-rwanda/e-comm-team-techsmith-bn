import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import getToken from '../utils/cookies.js';

// CONFIGURE DOTENV
dotenv.config();

// LOAD ENVIRONMENT VARIABLES
const { USER_SECRET: secret } = process.env;

const isBuyer = (req, res, next) => {
  // CATCH COOKIE FROM REQUEST
  const { cookie } = req.headers;

  try {
    // CHECK IF COOKIE IS NOT VALID
    if (!cookie) {
      return res.status(401).json({
        message:
          'Unauthorized access, please double-check if you are logged in',
      });
    }

    // EXTRACT TOKEN FROM COOKIE
    const token = getToken(req);

    // CHECK IF TOKEN IS NOT VALID
    if (!token) {
      return res.status(401).json({
        message:
          'Unauthorized access,  please double-check if you are logged in',
      });
    }

    // VERIFY TOKEN
    const { id, role } = jwt.verify(token, secret);

    // VERIFY IF USER IS NOT A BUYER
    if (role !== 3) {
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
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default isBuyer;
