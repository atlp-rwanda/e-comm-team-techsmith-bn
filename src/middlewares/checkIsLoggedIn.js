import jwt from 'jsonwebtoken';

export default (req, res, next) => {
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
        .status(401)
        .send({ message: 'Please login to perform this Action' });
    }
    const token = loginTokenCookie.split('=')[1];
    const decoded = jwt.verify(token, process.env.USER_SECRET);

    if (decoded.id !== Number(req.params.id)) {
      return res.status(404).json({
        message: 'You are only allowed to interact with your profile',
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
