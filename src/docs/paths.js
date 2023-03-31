import getProducts from './Product/getProducts.js';
import { passwordReset, requestReset } from './resetPassword.js';

const paths = {

  '/products': {
    get: getProducts,
  },
  '/password/requestReset': {
    post: requestReset
  },
  '/password/reset-password/{token}': {
    post: passwordReset
  }

};

export default paths;
