import registerUser from './User/userSignup.js';
import { passwordReset, requestReset } from './resetPassword.js';
import loginUser from './User/userLogin.js';
import requestSubscription from './User/userNewsletter.js';
import updateUserPassword from './User/updatePassword.js';
import getOrders from './Order/order.js';
import addPayment from './Payment/createPayment.js';

const paths = {
  // REQUEST RESET PASSWORD
  '/password/requestReset': {
    post: requestReset,
  },
  // CONFIRM RESET PASSWORD
  '/password/reset-password/{token}': {
    post: passwordReset,
  },
  // USER SIGNUP
  '/users/signup': {
    post: registerUser,
  },
  // USER LOGIN
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
