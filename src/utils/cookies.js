const getToken = (req) => {
  // Check existence of the cookie and return it
  const token = req.headers?.cookie
    ? req.headers.cookie.split('=')[1].split(';')[0]
    : req.headers?.credentials;
  return token;
};

export default getToken;
