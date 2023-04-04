import registerUser from './User/userSignup.js';
import getProducts from './Product/getProducts.js';
import loginUser from './User/userLogin.js';

const paths = {
  '/products': {
    get: getProducts,
  },
  '/users/signup': {
    post: registerUser,
  },
  '/users/login': {
    post: loginUser,
  },
};

export default paths;
