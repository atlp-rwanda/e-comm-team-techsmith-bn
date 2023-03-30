import registerUser from './User/userSignup.js';
import getProducts from './Product/getProducts.js';

const paths = {
  '/products': {
    get: getProducts,
  },
  '/user/signup': {
    post: registerUser,
  },
};

export default paths;
