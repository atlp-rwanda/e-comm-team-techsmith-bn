import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// verify if the user is the admin using the token in cookies
export default async (req, res, next) => {
  try {
    const cookieHeader = req.headers.cookie; // get cookie header string
    if (!cookieHeader) {
      return res
        .status(401)
        .send({ message: 'please login to perform this Action.' });
    }

    const cookies = cookieHeader.split(';'); // split cookies by semicolon

    const loginTokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('Authorized=')
    ); // find the loginToken cookie

    if (!loginTokenCookie) {
      return res
        .status(400)
        .send({ message: 'Please login to perform this Action' });
    }
    const token = loginTokenCookie.split('=')[1];
    const decoded = jwt.verify(token, process.env.USER_SECRET);

    if (decoded.role !== 1) {
      return res.status(403).send({
        message:
          'Unauthorized! Only site Admin is allowed to perform this action.',
      });
    }
    next();
  } catch (e) {
    next();
  }
};
