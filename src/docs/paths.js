import registerUser from './User/userSignup.js';
import getProducts from './Product/getProducts.js';
import loginUser from './User/userLogin.js';
import requestSubscription from './User/userNewsletter.js';
import updateUserPassword from './User/updatePassword.js';
import getOrders from './Order/order.js';

const paths = {
  '/products': {
    get: getProducts,
  },
  '/users/signup': {
    post: registerUser,
  },
<<<<<<< HEAD
=======
  '/password/reset-password/{token}': {
    post: passwordReset,
  },
  '/users/signup': {
    post: registerUser,
  },
>>>>>>> 6045388 (feature(getOrder) Admin should be  able get all orders                                                                                                                                                                                                                                                                                                                                                                          - admin can see all orders                                                                                                                                                                                      - if user is not admin should not allowed to get all orders                                                                                                                                                                                                                                                                                                                                                                      Delivers #184797947)
  '/users/login': {
    post: loginUser,
  },
  '/users/request-newsletter': {
    post: requestSubscription,
  },
  '/users/updateP': {
    put: updateUserPassword,
  },

  '/auth/google': {
    get: loginUser,
  },
  '/orders': {
    get: getOrders,
  },
};

export default paths;
