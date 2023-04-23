import registerUser from './User/userSignup.js';
import { passwordReset, requestReset } from './resetPassword.js';
import { loginUser, twoFactorAuthentication } from './User/userLogin.js';
import requestSubscription from './User/userNewsletter.js';
import updateUserPassword from './User/updatePassword.js';
import getOrders from './Order/order.js';
import addPayment from './Payment/createPayment.js';
import getProducts from './Product/getProducts.js';
import createProduct from './Product/createProduct.js';
import allAvailableProduct from './Product/getProductsInStock.js';
import availableProduct from './Product/getProductsInMyStock.js';
import myCollectionProducts from './Product/getAllMyProducts.js';
import deleteProduct from './Product/deleteAproduct.js';
import updateProduct from './Product/updateAproduct.js';
import searchProducts from './Product/searchProduct.js';
import updatedUser from './User/updateUser.js';
import enableUser from './Admin/enableUser.js';
import disableUser from './Admin/disableUser.js';
import createUser from './Admin/createUser.js';
import getUsers from './Admin/getUsers.js';
import createOrder from './Order/createOrder.js';
import updateUser from './Admin/updateUser.js';
import deleteUser from './Admin/deleteUser.js';
import userPermissions from './Admin/changeRole.js';
import getProduct from './Admin/getProducts.js';
import getAsingleProduct from './Admin/getASingleProduct.js';
import createProducts from './Admin/createProduct.js';
import deleteProducts from './Admin/deleteProduct.js';
import updateProducts from './Admin/updateProduct.js';
import addProductToWishlist from './Wishlist/addProductToWishlist.js';
import updateOrder from './Order/updateOrder.js';
import deleteOrder from './Order/deleteOrder.js';
import checkexpiration from './Product/checkExpirationOfProduct.js';
import deliveredOrder from './Order/delivered.js';
import cancelledOrder from './Order/cancelled.js';
import logoutUser from './User/userLogout.js';
import addItemInCart from './Cart/addItemInCart.js';
import viewItemInCart from './Cart/viewItemsInCart.js';

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
  // _______________ ORDERS _________________________
  '/orders': {
    get: getOrders,
    post: createOrder,
  },
  '/orders/{oId}/user/{uId}': {
    put: updateOrder,
    delete: deleteOrder,
  },
  '/orders/delivered/{id}': {
    put: deliveredOrder,
  },
  '/orders/cancelled/{id}': {
    put: cancelledOrder,
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
  // ALL PRODUCTS IN MY COLLECTION
  '/products/myStock': {
    get: myCollectionProducts,
  },
  // AVAILABLE PRODUCTS IN STOCK
  '/products/inStock': {
    get: allAvailableProduct,
  },
  // AVAILABLE PRODUCTS IN COLLECTON
  '/products/inMyStock': {
    get: availableProduct,
  },
  '/products/{id}': {
    put: updateProduct,
  },
  '/products/{pId}': {
    delete: deleteProduct,
  },
  '/products/search': {
    post: searchProducts,
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
  // ADMIN CRUD PRODUCTS
  '/admin/products': {
    get: getProduct,
    post: createProducts,
  },
  '/admin/products/{id}': {
    put: updateProducts,
    delete: deleteProducts,
    get: getAsingleProduct,
  },

  // changing user's roles by admin
  '/users/{id}/role/{role}': {
    put: userPermissions,
  },
  // adding product to wishlist
  '/wishlist/{id}': {
    post: addProductToWishlist,
  },
  '/products/expire': {
    get: checkexpiration,
  },
  // LOGOUT
  '/users/logout': {
    post: logoutUser,
  },
  // ADDING ITEMS IN CART
  '/cart/{id}': {
    post: addItemInCart,
  },
  // VIEWING ITEMS IN CART
  '/cart': {
    get: viewItemInCart,
  },
};

export default paths;
