import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getToken } from '../utils/cookies';

dotenv.config();

// verify if the user is the admin using the token in cookies
export default async (req, res, next) => {
  try {
    const { cookie } = req.headers;
    // IF NO COOKIE IS FOUND
    if (!cookie) {
      return res
        .status(401)
        .send({ message: 'Please log in to perform this action' });
    }
    // EXTRACT TOKEN FROM COOKIE
    const token = getToken(req);
    // IF NO TOKEN IS FOUND
    if (!token) {
      return res
        .status(400)
        .send({ message: 'Could not verify your authentication' });
    }
    // VERIFY TOKEN
    const { id, role } = jwt.verify(token, process.env.USER_SECRET);
    // IF USER IS NOT ADMIN
    if (role !== 1) {
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
    next();
  }
};
