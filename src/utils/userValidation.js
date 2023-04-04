// VALIDATE EMAIL
const validateEmail = (email) => {
  // validate user email
  const emailRegex =
    /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g;

  const validEmail = emailRegex.test(email);

  return validEmail;
};

// VALIDATE PASSWORD
const validatePassword = (password) => {
  let response = null;
  // validate user password
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  response = passwordRegex.test(password);

  return response;
};

export { validateEmail, validatePassword };
