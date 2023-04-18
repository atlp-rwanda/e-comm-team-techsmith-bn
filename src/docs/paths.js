import registerUser from './User/userSignup.js';
import { passwordReset, requestReset } from './resetPassword.js';
import { loginUser, twoFactorAuthentication } from './User/userLogin.js';
import requestSubscription from './User/userNewsletter.js';
import updateUserPassword from './User/updatePassword.js';
import getOrders from './Order/order.js';
import addPayment from './Payment/createPayment.js';
import createProduct from './Product/addProduct.js';
import getProducts from './Product/getProducts.js';
import searchProducts from './Product/searchProduct.js';
import updatedUser from './User/updateUser.js';
import enableUser from './Admin/enableUser.js';
import disableUser from './Admin/disableUser.js';
import createUser from './Admin/createUser.js';
import getUsers from './Admin/getUsers.js';
import updateUser from './Admin/updateUser.js';
import deleteUser from './Admin/deleteUser.js';
import userPermissions from './Admin/changeRole.js';

const paths = {
  // REQUEST RESET PASSWORD
  '/password/requestReset': {
    post: requestReset,
  },
  // CONFIRM RESET PASSWORD
  '/password/resetPassword/{token}': {
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
  // CONFIRM TWO FACTOR AUTHENTICATION
  '/users/login/{token}': {
    get: twoFactorAuthentication,
  },
  // REQUEST NEWSLETTER SUBSCRIPTION
  '/users/requestNewsletter': {
    post: requestSubscription,
  },
  // CONFIRM NEWSLETTER SUBSCRIPTION
  '/users/update/password': {
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
  '/products': {
    post: createProduct,
    get: getProducts,
  },

  '/products/all': {
    get: searchProducts,
  },
  // UPDATE USER
  '/users/{id}': {
    put: updatedUser,
  },
  // ENABLE AND DISABLE USER
  '/users/enable/{id}': {
    put: enableUser,
  },
  '/users/disable/{id}': {
    put: disableUser,
  },

  // Admin crud
  '/admin': {
    post: createUser,
    get: getUsers,
  },

  '/admin/{id}': {
    put: updateUser,
    delete: deleteUser,
  },

  // changing user's roles by admin
  '/users/{id}/role/{role}': {
    put: userPermissions,
  },
};

export default paths;
