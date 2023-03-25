import getProducts from './Product/getProducts';

const paths = {

  '/products': {
    get: getProducts,
  },

};

export default paths;
