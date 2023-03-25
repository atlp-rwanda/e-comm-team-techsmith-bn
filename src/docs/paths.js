import getProducts from './Product/getProducts.js';

const paths = {

  '/products': {
    get: getProducts,
  },

};

export default paths;
