import registerUser from './User/userSignup.js';
import getProducts from './Product/getProducts.js';
import { passwordReset, requestReset } from './resetPassword.js';
import loginUser from './User/userLogin.js';
import requestSubscription from './User/userNewsletter.js';
import updateUserPassword from './User/updatePassword.js';

const paths = {
  '/products': {
    get: getProducts,
  },
  '/password/requestReset': {
    post: requestReset,
  },
  '/password/reset-password/{token}': {
    post: passwordReset,
  },
  '/user/signup': {
    '/users/signup': {
      post: registerUser,
    },
    '/users/login': {
      post: loginUser,
    },
  },
  '/users/request-newsletter': {
    post: requestSubscription,
  },
  '/users/updateP': {
    put: updateUserPassword,
  },
};

export default paths;
