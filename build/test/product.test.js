"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _chai = _interopRequireDefault(require("chai"));
var _chaiHttp = _interopRequireDefault(require("chai-http"));
var _mocha = require("mocha");
var _server = _interopRequireDefault(require("../server.js"));
var _random = _interopRequireDefault(require("../utils/random.js"));
var _adminProduct, _adminBadProduct;
_chai["default"].should();
_chai["default"].use(_chaiHttp["default"]);
var expect = _chai["default"].expect;
var goodProduct = {
  name: "product".concat((0, _random["default"])(10)),
  image: ['https://images.unsplash.com/photo-1639020715359-f03b05835829?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80', 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=800', 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
  price: 85000,
  categoryId: 75,
  condition: 'New',
  description: 'New Samsung A10 released in 2021',
  quantity: 20,
  sellerId: 36,
  expiryDate: '2023-05-06T17:30:00.000Z'
};
var adminProduct = (_adminProduct = {
  name: "product".concat((0, _random["default"])(10)),
  image: ['https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg', 'https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg', 'https://www.pngwing.com/en/free-png-zbfan', 'https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg'],
  price: 85000,
  categoryId: 70,
  condition: 'New',
  quantity: 5,
  description: 'New Samsung A10 released in 2021'
}, (0, _defineProperty2["default"])(_adminProduct, "quantity", 20), (0, _defineProperty2["default"])(_adminProduct, "sellerId", 36), (0, _defineProperty2["default"])(_adminProduct, "expiryDate", '2023-05-06T17:30:00.000Z'), _adminProduct);
var adminBadProduct = (_adminBadProduct = {
  namess: "product".concat((0, _random["default"])(10)),
  imagess: ['https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg', 'https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg', 'https://www.pngwing.com/en/free-png-zbfan', 'https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg'],
  price: 85000,
  categoryId: 70,
  condition: 'New',
  quantity: 5,
  description: 'New Samsung A10 released in 2021'
}, (0, _defineProperty2["default"])(_adminBadProduct, "quantity", 20), (0, _defineProperty2["default"])(_adminBadProduct, "sellerId", 36), (0, _defineProperty2["default"])(_adminBadProduct, "expiryDate", '2023-05-06T17:30:00.000Z'), _adminBadProduct);
// BAD PRODUCT
var badProduct = {
  name: "product".concat((0, _random["default"])(10)),
  image: ['https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg', 'https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg', 'https://www.pngwing.com/en/free-png-zbfan', 'https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg'],
  price: 85000,
  condition: 'New',
  quantity: 20,
  description: 'New Samsung A10 released in 2021',
  expiryDate: '2023-05-06T17:30:00.000Z'
};

// INITIALIZING AUTHORIZATION COOKIE
var sellerCookie = '',
  twoFAToken = '';
var adminCookie = '';

// SELLER LOGIN
var sellerLogin = {
  email: 'atlpseller@gmail.com',
  password: 'Password@00'
};

// ADMIN LOG IN
var adminLogin = {
  email: 'joshua@gmail.com',
  password: 'Testing@123'
};
var productoUpdate = {
  name: 'productcqhwcvig',
  image: ['https://userconent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg', 'https://userconent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg', 'https://www.pnging.com/en/free-png-zbfan', 'https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg'],
  categoryId: 75,
  price: 5000,
  quantity: 5,
  description: 'The fastest on baterry',
  expiryDate: '2023-04-06 10:30:00-07:00'
};

// SELLER LOGIN REQUEST
describe('Seller Login', function () {
  (0, _mocha.it)('Login and return seller token for two factor authentication', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(sellerLogin).end(function (err, res) {
      twoFAToken = res.body.token;
      expect(res).to.have.status(202);
      done();
    });
  });
});

// SELLER CONFIRM TWO FACTOR AUTHENTICATION
describe('Seller 2FA', function () {
  (0, _mocha.it)('Confirm 2FA and return seller cookie', function (done) {
    _chai["default"].request(_server["default"]).get("/api/users/login/".concat(twoFAToken)).end(function (err, res) {
      sellerCookie = res.header['set-cookie'];
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('Admin Login', function () {
  (0, _mocha.it)('Login succesfully', function (done) {
    _chai["default"].request(_server["default"]).post('/api/users/login').send(adminLogin).end(function (err, res) {
      adminCookie = res.header['set-cookie'][0];
      expect(res).to.have.status(200);
      done();
    });
  });
});

// add product test by seller
describe('Add  product', function () {
  describe('User active', function () {
    describe('All information provided', function () {
      (0, _mocha.it)('Should add a product and return code 201', function (done) {
        _chai["default"].request(_server["default"]).post('/api/products').send(goodProduct).set('cookie', sellerCookie).end(function (err, res) {
          expect(res).to.have.status(201);
          done();
        });
      });
    });
    describe('Information not provided', function () {
      (0, _mocha.it)('Should return code 400', function (done) {
        _chai["default"].request(_server["default"]).post('/api/products').send(badProduct).set('cookie', sellerCookie).end(function (err, res) {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
    describe('Adding existing product', function () {
      (0, _mocha.it)('Should return code 409', function (done) {
        _chai["default"].request(_server["default"]).post('/api/products').send(goodProduct).set('cookie', sellerCookie).end(function (err, res) {
          expect(res).to.have.status(409);
          done();
        });
      });
    });
  });
  describe('Check Expiration of products', function () {
    (0, _mocha.it)('Should return Code 200 and valid response data', function (done) {
      _chai["default"].request(_server["default"]).get('/api/products/expired')
      // .set('cookie', cookie)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  describe('Available products', function () {
    describe('Products in stock', function () {
      (0, _mocha.it)('Should get  products and return code 200', function (done) {
        _chai["default"].request(_server["default"]).get('/api/products/inStock').end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
    describe('A seller can get specific product', function () {
      (0, _mocha.it)('A seller can get specific product ', function (done) {
        _chai["default"].request(_server["default"]).get('/api/products/225').set('cookie', sellerCookie).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
    describe('A seller  get specific product not in stock', function () {
      (0, _mocha.it)('A seller can get specific product not in stock ', function (done) {
        _chai["default"].request(_server["default"]).get('/api/products/-1').set('cookie', sellerCookie).end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
    describe('Delete a specific  product', function () {
      describe('Delete a product not in your collection', function () {
        (0, _mocha.it)('Should return code 404', function (done) {
          _chai["default"].request(_server["default"])["delete"]('/api/products/5').set('cookie', sellerCookie).end(function (err, res) {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
    describe('Update a specific  product', function () {
      describe('update a product', function () {
        (0, _mocha.it)('Should return code 200', function (done) {
          _chai["default"].request(_server["default"]).put('/api/products/29').send(productoUpdate).set('cookie', sellerCookie).end(function (err, res) {
            expect(res).to.have.status(200);
            done();
          });
        });
      });
      describe('Update a product not in your collection', function () {
        (0, _mocha.it)('Should return code 404', function (done) {
          _chai["default"].request(_server["default"]).put('/api/products/-1').set('cookie', sellerCookie).end(function (err, res) {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });

    // User CAN GET ALL ORDERS
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)('can display all Product ', function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: null,
          price: null,
          categoryIds: null
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)('can search Products which have substring in name of "product" ', function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: 'product',
          price: null,
          categoryIds: null
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)('can search Products which have price of 85000 ', function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: null,
          price: 85000,
          categoryIds: null
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)('can search Products which have category Id of 70 ', function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: null,
          price: null,
          categoryIds: 70
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)('can search Products which have substring in name of "product" or have price of 85000 or have  category Id of 70 ', function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: 'product',
          price: 85000,
          categoryIds: 70
        }).end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
      });
    });
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)("can search Products and get an error when name parameter doesn't match any product", function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: 'productsdfdsfsfsdca32343242342',
          price: null,
          categoryIds: null
        }).end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)("can search Products and get an error when price parameter doesn't match any product", function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: null,
          price: 8500032424,
          categoryIds: null
        }).end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)("can search Products and get an error when categoryIds parameter doesn't match any product ", function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: null,
          price: null,
          categoryIds: 7023424
        }).end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
    describe('Buyer, Seller or Admin users', function () {
      (0, _mocha.it)("can search Products and get an error when name, price or categoryIds parameters doesn't match any product", function (done) {
        _chai["default"].request(_server["default"]).post('/api/products/search').send({
          name: 'product2343242',
          price: 85000324234,
          categoryIds: 70545
        }).end(function (err, res) {
          expect(res).to.have.status(404);
          done();
        });
      });
    });
  });
});

// CRUD PRODUCT BY ADMIN
describe('CRUD product by admin', function () {
  // GET ALL PRODUCTS
  describe('Admin should be able to get all products', function () {
    (0, _mocha.it)('Admin should be able to get all products', function (done) {
      _chai["default"].request(_server["default"]).get('/api/admin/products').set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  // GET A SPECIFIC PRODUCT
  describe('Admin should be able to get specific', function () {
    (0, _mocha.it)('Admin should be able to get specific ', function (done) {
      _chai["default"].request(_server["default"]).get('/api/admin/products/225').set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
  describe('Admin  get specific product not in stock', function () {
    (0, _mocha.it)('Admin  get specific product not in stock ', function (done) {
      _chai["default"].request(_server["default"]).get('/api/admin/products/1010101010').set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
  // CREATE NEW PRODUCT
  describe('Given a user is an admin', function () {
    (0, _mocha.it)('Should create a new product', function (done) {
      _chai["default"].request(_server["default"]).post('/api/admin/products').send(adminProduct).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(201);
        done();
      });
    });
  });
  describe('Adding existing product', function () {
    (0, _mocha.it)('Should return code 409', function (done) {
      _chai["default"].request(_server["default"]).post('/api/admin/products').send(goodProduct).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(409);
        done();
      });
    });
  });
  describe('Information not provided', function () {
    (0, _mocha.it)('Should return code 400', function (done) {
      _chai["default"].request(_server["default"]).post('/api/admin/products').send(badProduct).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(400);
        done();
      });
    });
  });

  // UPDATE A PRODUCT
  describe('Given a user is an admin', function () {
    (0, _mocha.it)('Should update a product', function (done) {
      _chai["default"].request(_server["default"]).put('/api/admin/products/262').send(adminProduct).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  // DELETE NON-EXISTING PRODUCT
  describe('Given a user is an admin and is trying to delete a non-existing product', function () {
    (0, _mocha.it)('Should not delete a product and return error 404', function (done) {
      _chai["default"].request(_server["default"])["delete"]('/api/admin/product/-1').set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
  // PROVIDING WITH MISSING INFORAMTION
  describe('Given a user is an admin and is trying to create with missing product', function () {
    (0, _mocha.it)('Should not create with missing criteria', function (done) {
      _chai["default"].request(_server["default"]).post('/api/admin/products').send(adminBadProduct).set('cookie', adminCookie).end(function (err, res) {
        expect(res).to.have.status(500);
        done();
      });
    });
  });
});
describe('Available products', function () {
  describe('Products in stock', function () {
    (0, _mocha.it)('Should get  products and return code 200', function (done) {
      _chai["default"].request(_server["default"]).get('/api/products/inStock').end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});
describe('Available products in my stock', function () {
  describe('Products in stock', function () {
    (0, _mocha.it)('Should get  products and return code 200', function (done) {
      _chai["default"].request(_server["default"]).get('/api/products/inMyStock').set('cookie', sellerCookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});
describe('All products a seller added in stock', function () {
  describe('Products added stock', function () {
    (0, _mocha.it)('Should get  products added  and return code 200', function (done) {
      _chai["default"].request(_server["default"]).get('/api/products/myStock').set('cookie', sellerCookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});
describe('Delete a specific  product', function () {
  describe('Delete a product not in your collection', function () {
    (0, _mocha.it)('Should return code 404', function (done) {
      _chai["default"].request(_server["default"])["delete"]('/api/products/5').set('cookie', sellerCookie).end(function (err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});
describe('get product from your collection', function () {
  (0, _mocha.it)('should returnn status code of 200', function (done) {
    _chai["default"].request(_server["default"]).get('/api/products/mySingleProduct/4').set('Cookie', sellerCookie).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});

// PRODUCT NOT FOUND
describe('Product not found', function () {
  (0, _mocha.it)('should returnn status code of 404 if the product is not available', function (done) {
    _chai["default"].request(_server["default"]).get('/api/products/mySingleProduct/21').set('cookie', sellerCookie).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});
describe('Update a specific  product', function () {
  describe('update a product', function () {
    (0, _mocha.it)('Should return code 200', function (done) {
      _chai["default"].request(_server["default"]).put('/api/products/29').send(productoUpdate).set('cookie', sellerCookie).end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
    });
  });
});
describe('Update a product not in your collection', function () {
  (0, _mocha.it)('Should return code 404', function (done) {
    _chai["default"].request(_server["default"]).put('/api/products/-1').set('cookie', sellerCookie).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});

// User CAN GET ALL OORDERS
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)('can display all Product ', function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: null,
      price: null,
      categoryIds: null
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)('can search Products which have substring in name of "product" ', function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: 'TV',
      price: null,
      categoryIds: null
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)('can search Products which have price of 85000 ', function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: null,
      price: 85000,
      categoryIds: null
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)('can search Products which have category Id of 70 ', function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: null,
      price: null,
      categoryIds: 70
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)('can search Products which have substring in name of "product" or have price of 85000 or have  category Id of 70 ', function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: 'product',
      price: 85000,
      categoryIds: 70
    }).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });
});
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)("can search Products and get an error when name parameter doesn't match any product", function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: 'productsdfdsfsfsdca32343242342',
      price: null,
      categoryIds: null
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)("can search Products and get an error when price parameter doesn't match any product", function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: null,
      price: 8500032424,
      categoryIds: null
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)("can search Products and get an error when categoryIds parameter doesn't match any product ", function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: null,
      price: null,
      categoryIds: 7023424
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});
describe('Buyer, Seller or Admin users', function () {
  (0, _mocha.it)("can search Products and get an error when name, price or categoryIds parameters doesn't match any product", function (done) {
    _chai["default"].request(_server["default"]).post('/api/products/search').send({
      name: 'product2343242',
      price: 85000324234,
      categoryIds: 70545
    }).end(function (err, res) {
      expect(res).to.have.status(404);
      done();
    });
  });
});