import registerUser from './User/userSignup.js';
<<<<<<< HEAD
import getProducts from './Product/getProducts.js';
=======
import { passwordReset, requestReset } from './resetPassword.js';
>>>>>>> ceaef81 (feature(payment) handle payments using Stripe API)
import loginUser from './User/userLogin.js';
import requestSubscription from './User/userNewsletter.js';
import updateUserPassword from './User/updatePassword.js';
import getOrders from './Order/order.js';
import addPayment from './Payment/createPayment.js';

const paths = {
<<<<<<< HEAD
  '/products': {
    get: getProducts,
  },
  '/users/signup': {
    post: registerUser,
  },
<<<<<<< HEAD
=======
=======
  // REQUEST RESET PASSWORD
  '/password/requestReset': {
    post: requestReset,
  },
  // CONFIRM RESET PASSWORD
>>>>>>> ceaef81 (feature(payment) handle payments using Stripe API)
  '/password/reset-password/{token}': {
    post: passwordReset,
  },
  // USER SIGNUP
  '/users/signup': {
    post: registerUser,
  },
<<<<<<< HEAD
>>>>>>> 6045388 (feature(getOrder) Admin should be  able get all orders                                                                                                                                                                                                                                                                                                                                                                          - admin can see all orders                                                                                                                                                                                      - if user is not admin should not allowed to get all orders                                                                                                                                                                                                                                                                                                                                                                      Delivers #184797947)
=======
  // USER LOGIN
>>>>>>> ceaef81 (feature(payment) handle payments using Stripe API)
  '/users/login': {
    post: loginUser,
  },
  // REQUEST NEWSLETTER SUBSCRIPTION
  '/users/request-newsletter': {
    post: requestSubscription,
  },
  // CONFIRM NEWSLETTER SUBSCRIPTION
  '/users/update-password': {
    put: updateUserPassword,
  },
  // GET ALL ORDERS
  '/orders': {
    get: getOrders,
  },
  // GOOGLE AUTHENTICATION
  '/auth/google': {
    get: loginUser,
  },
  // CREATE ORDER PAYMENT
  '/orders/{id}/payment': {
    post: addPayment,
  },
};

export default paths;
