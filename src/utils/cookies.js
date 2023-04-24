const getCookie = (req) => {
  // Check existence of the cookie and return it
  const cookie = req.headers.cookie
    ? req.headers.cookie
    : req.headers.authorization;
  return cookie;
};

const getToken = (req) => {
  // Check existence of the cookie and return it
  const cookie = req.headers.cookie
    ? req.headers.cookie
    : req.headers.authorization;
  if (!cookie) {
    return null;
  }
  const token = cookie.split('=')[1].split(';')[0];
  return token;
};

export { getCookie, getToken };
