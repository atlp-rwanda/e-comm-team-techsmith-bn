import registerUser from './User/userSignup.js';
<<<<<<< HEAD
import getProducts from './Product/getProducts.js';
=======
import { passwordReset, requestReset } from './resetPassword.js';
<<<<<<< HEAD
>>>>>>> ceaef81 (feature(payment) handle payments using Stripe API)
import loginUser from './User/userLogin.js';
=======
import { loginUser, twoFactorAuthentication } from './User/userLogin.js';
>>>>>>> 64dbe3b (ft(2FA):two factor authentication)
import requestSubscription from './User/userNewsletter.js';
import updateUserPassword from './User/updatePassword.js';
import getOrders from './Order/order.js';
import addPayment from './Payment/createPayment.js';
import createProduct from './Product/addProduct.js';
import getProducts from './Product/getProducts.js';
import updatedUser from './User/updateUser.js';

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
  // CONFIRM TWO FACTOR AUTHENTICATION
  '/users/login/{token}': {
    get: twoFactorAuthentication,
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
  '/Product/addProduct': {
    post: createProduct,
  },
  '/Product/allProduct': {
    get: getProducts,
  },
  // UPDATE USER
  '/users/{id}': {
    put: updatedUser,
  },
};

export default paths;
