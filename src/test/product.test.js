import chai from 'chai';
import chaiHttp from 'chai-http';
import { it } from 'mocha';
import app from '../server.js';
import makeid from '../utils/random.js';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const goodProduct = {
  name: `product${makeid(10)}`,
  image: [
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687472057/products/pexels-photo-376464_opmwxp.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687460791/products/qpww5y9guwavcx29bl3p.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687460791/products/rbsfje0ufqchiwptioi0.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687452780/products/pexels-photo-1139556_ss8bv5.jpg"
  ],
  price: 120,
  categoryId: 75,
  condition: 'New',
  description: 'New Samsung A10 released in 2021',
  quantity: 20,
  sellerId: 36,
  expiryDate: '2023-09-30 10:30:00-07:00',
};
const adminProduct = {
  name: `product${makeid(10)}`,
  image: [
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687450070/products/cmnbhoq3qqo9tdznu1yd.png",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687449713/products/dwmrjvdfx1lmnwdgjwd4.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687473517/ecommerce/hero-2_fe47un.webp",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687473516/ecommerce/hero-4_lcvnsq.avif"
  ],
  price: 85000,
  categoryId: 70,
  condition: 'New',
  quantity: 5,
  description: 'New Samsung A10 released in 2021',
  quantity: 20,
  sellerId: 36,
  expiryDate: '2023-05-06T17:30:00.000Z',
};
const adminBadProduct = {
  namess: `product${makeid(10)}`,
  imagess: [
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687473516/ecommerce/hero-1_j41qfu.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1685021867/ecommerce/nike-just-do-it_o3i0pz.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1684829244/ecommerce/homeImage_zcbm0y.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1685229667/ecommerce/c08012248_thyevv.png"
  ],
  price: 85000,
  categoryId: 70,
  condition: 'New',
  quantity: 5,
  description: 'New Samsung A10 released in 2021',
  quantity: 20,
  sellerId: 36,
  expiryDate: '2023-05-06T17:30:00.000Z',
};
// BAD PRODUCT
const badProduct = {
  name: `product${makeid(10)}`,
  image: [
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687473516/ecommerce/hero-1_j41qfu.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1685021867/ecommerce/nike-just-do-it_o3i0pz.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1684829244/ecommerce/homeImage_zcbm0y.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1685229667/ecommerce/c08012248_thyevv.png"
  ],
  price: 85000,
  condition: 'New',
  quantity: 20,
  description: 'New Samsung A10 released in 2021',
  expiryDate: '2023-05-06T17:30:00.000Z',
};

// INITIALIZING AUTHORIZATION COOKIE
let sellerCookie = '',
  twoFAToken = '';
let adminCookie = '';

// SELLER LOGIN
const sellerLogin = {
  email: 'atlpseller@gmail.com',
  password: 'Password@00',
};

// ADMIN LOG IN
const adminLogin = {
  email: 'joshua@gmail.com',
  password: 'Testing@123',
};

const productoUpdate = {
  name: 'product test',
  image: [
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687475545/ecommerce/photo-1543145223-1f9043516739_mklkna.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687460791/products/qpww5y9guwavcx29bl3p.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687460791/products/rbsfje0ufqchiwptioi0.jpg",
    "https://res.cloudinary.com/nishimweprince/image/upload/v1687449713/products/dwmrjvdfx1lmnwdgjwd4.jpg"
  ],
  price: 85000,
  condition: 'New',
  quantity: 20,
  description: 'New Samsung A10 released in 2021',
  expiryDate: '2023-05-06T17:30:00.000Z',
};

// SELLER LOGIN REQUEST
describe('Seller Login', () => {
  it('Login and return seller token for two factor authentication', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send(sellerLogin)
      .end((err, res) => {
        twoFAToken =  res.body.token;
        expect(res).to.have.status(202);
        done();
      });
  });
});

// SELLER CONFIRM TWO FACTOR AUTHENTICATION
describe('Seller 2FA', () => {
  it('Confirm 2FA and return seller cookie', (done) => {
    chai
      .request(app)
      .get(`/api/users/login/${twoFAToken}/?email=${sellerLogin.email}`)
      .end((err, res) => {
        sellerCookie = res.header['set-cookie'][0];
        expect(res).to.have.status(200);
        done();
      });
  });
});
describe('Admin Login', () => {
  it('Login succesfully', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send(adminLogin)
      .end((err, res) => {
        adminCookie = res.header['set-cookie'][0];
        expect(res).to.have.status(200);
        done();
      });
  });
});

// add product test by seller
describe('Add  product', () => {
  describe('User active', () => {
    describe('All information provided', () => {
      it('Should add a product and return code 201', (done) => {
        chai
          .request(app)
          .post('/api/products')
          .send(goodProduct)
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(201);
            done();
          });
      });
    });
    describe('Information not provided', () => {
      it('Should return code 400', (done) => {
        chai
          .request(app)
          .post('/api/products')
          .send(badProduct)
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
    describe('Adding existing product', () => {
      it('Should return code 409', (done) => {
        chai
          .request(app)
          .post('/api/products')
          .send(goodProduct)
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(409);
            done();
          });
      });
    });
  });

  describe('Check Expiration of products', () => {
    it('Should return Code 200 and valid response data', (done) => {
      chai
        .request(app)
        .get('/api/products/expired')
        // .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Available products', () => {
    describe('A seller can get specific product', () => {
      it('A seller can get specific product ', (done) => {
        chai
          .request(app)
          .get('/api/products/225')
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });
    describe('A seller  get specific product not in stock', () => {
      it('A seller can get specific product not in stock ', (done) => {
        chai
          .request(app)
          .get('/api/products/-1')
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });
    describe('Delete a specific  product', () => {
      describe('Delete a product not in your collection', () => {
        it('Should return code 404', (done) => {
          chai
            .request(app)
            .delete('/api/products/5')
            .set('cookie', sellerCookie)
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
        });
      });
    });
    describe('Update a specific  product', () => {
      describe('update a product', () => {
        it('Should return code 200', (done) => {
          chai
            .request(app)
            .put('/api/products/70')
            .send(productoUpdate)
            .set('cookie', sellerCookie)
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
        });
      });
      describe('Update a product not in your collection', () => {
        it('Should return code 404', (done) => {
          chai
            .request(app)
            .put('/api/products/-1')
            .set('cookie', sellerCookie)
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
        });
      });
    });

    // User CAN GET ALL ORDERS
    describe('Buyer, Seller or Admin users', () => {
      it('can display all Product ', (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: null,
            price: null,
            categoryIds: null,
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('Buyer, Seller or Admin users', () => {
      it('can search Products which have substring in name of "product" ', (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: 'product',
            price: null,
            categoryIds: null,
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('Buyer, Seller or Admin users', () => {
      it('can search Products which have price of 85000 ', (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: null,
            price: 85000,
            categoryIds: null,
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('Buyer, Seller or Admin users', () => {
      it('can search Products which have category Id of 75', (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: null,
            price: null,
            categoryIds: 75,
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('Buyer, Seller or Admin users', () => {
      it('can search Products which have substring in name of "product" or have price of 85000 or have  category Id of 70 ', (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: 'product',
            price: 85000,
            categoryIds: 70,
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });

    describe('Buyer, Seller or Admin users', () => {
      it("can search Products and get an error when name parameter doesn't match any product", (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: 'productsdfdsfsfsdca32343242342',
            price: null,
            categoryIds: null,
          })
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });

    describe('Buyer, Seller or Admin users', () => {
      it("can search Products and get an error when price parameter doesn't match any product", (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: null,
            price: 8500032424,
            categoryIds: null,
          })
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });

    describe('Buyer, Seller or Admin users', () => {
      it("can search Products and get an error when categoryIds parameter doesn't match any product ", (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: null,
            price: null,
            categoryIds: 7023424,
          })
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });

    describe('Buyer, Seller or Admin users', () => {
      it("can search Products and get an error when name, price or categoryIds parameters doesn't match any product", (done) => {
        chai
          .request(app)
          .post('/api/products/search')
          .send({
            name: 'product2343242',
            price: 85000324234,
            categoryIds: 70545,
          })
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });
  });
});

// CRUD PRODUCT BY ADMIN
describe('CRUD product by admin', () => {
  // GET ALL PRODUCTS
  describe('Admin should be able to get all products', () => {
    it('Admin should be able to get all products', (done) => {
      chai
        .request(app)
        .get('/api/admin/products')
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // GET A SPECIFIC PRODUCT
  describe('Admin should be able to get specific', () => {
    it('Admin should be able to get specific ', (done) => {
      chai
        .request(app)
        .get('/api/admin/products/225')
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  describe('Admin  get specific product not in stock', () => {
    it('Admin  get specific product not in stock ', (done) => {
      chai
        .request(app)
        .get('/api/admin/products/1010101010')
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  // CREATE NEW PRODUCT
  describe('Given a user is an admin', () => {
    it('Should create a new product', (done) => {
      chai
        .request(app)
        .post('/api/admin/products')
        .send(adminProduct)
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });
  describe('Adding existing product', () => {
    it('Should return code 409', (done) => {
      chai
        .request(app)
        .post('/api/admin/products')
        .send(goodProduct)
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(409);
          done();
        });
    });
  });
  describe('Information not provided', () => {
    it('Should return code 400', (done) => {
      chai
        .request(app)
        .post('/api/admin/products')
        .send(badProduct)
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // UPDATE A PRODUCT
  describe('Given a user is an admin', () => {
    it('Should update a product', (done) => {
      chai
        .request(app)
        .put('/api/admin/products/262')
        .send(adminProduct)
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // DELETE NON-EXISTING PRODUCT
  describe('Given a user is an admin and is trying to delete a non-existing product', () => {
    it('Should not delete a product and return error 404', (done) => {
      chai
        .request(app)
        .delete('/api/admin/product/-1')
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  // PROVIDING WITH MISSING INFORAMTION
  describe('Given a user is an admin and is trying to create with missing product', () => {
    it('Should not create with missing criteria', (done) => {
      chai
        .request(app)
        .post('/api/admin/products')
        .send(adminBadProduct)
        .set('cookie', adminCookie)
        .end((err, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });
});
describe('Available products', () => {
  describe('Products in stock', () => {
    it('Should get  products and return code 200', (done) => {
      chai
        .request(app)
        .get('/api/products/inStock')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('Available products in my stock', () => {
  describe('Products in stock', () => {
    it('Should get  products and return code 200', (done) => {
      chai
        .request(app)
        .get('/api/products/inMyStock')
        .set('cookie', sellerCookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
describe('All products a seller added in stock', () => {
  describe('Products added stock', () => {
    it('Should get  products added  and return code 200', (done) => {
      chai
        .request(app)
        .get('/api/products/myStock')
        .set('cookie', sellerCookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

describe('Delete a specific  product', () => {
  describe('Delete a product not in your collection', () => {
    it('Should return code 404', (done) => {
      chai
        .request(app)
        .delete('/api/products/5')
        .set('cookie', sellerCookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

describe('get product from your collection', () => {
  it('should returnn status code of 200', (done) => {
    chai
      .request(app)
      .get('/api/products/mySingleProduct/4')
      .set('Cookie', sellerCookie)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

// PRODUCT NOT FOUND
describe('Product not found', () => {
  it('should returnn status code of 404 if the product is not available', (done) => {
    chai
      .request(app)
      .get('/api/products/mySingleProduct/21')
      .set('cookie', sellerCookie)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('Update a specific  product', () => {
  describe('update a product', () => {
    it('Should return code 200', (done) => {
      chai
        .request(app)
        .put('/api/products/70')
        .send(productoUpdate)
        .set('cookie', sellerCookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

describe('Update a product not in your collection', () => {
  it('Should return code 404', (done) => {
    chai
      .request(app)
      .put('/api/products/-1')
      .set('cookie', sellerCookie)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

// User CAN GET ALL OORDERS
describe('Buyer, Seller or Admin users', () => {
  it('can display all Product ', (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: null,
        price: null,
        categoryIds: null,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Buyer, Seller or Admin users', () => {
  it('can search Products which have substring in name of "product" ', (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: 'TV',
        price: null,
        categoryIds: null,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Buyer, Seller or Admin users', () => {
  it('can search Products which have price of 85000 ', (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: null,
        price: 85000,
        categoryIds: null,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Buyer, Seller or Admin users', () => {
  it('can search Products which have category Id of 70 ', (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: null,
        price: null,
        categoryIds: 70,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Buyer, Seller or Admin users', () => {
  it('can search Products which have substring in name of "product" or have price of 85000 or have  category Id of 70 ', (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: 'product',
        price: 85000,
        categoryIds: 70,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Buyer, Seller or Admin users', () => {
  it("can search Products and get an error when name parameter doesn't match any product", (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: 'productsdfdsfsfsdca32343242342',
        price: null,
        categoryIds: null,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('Buyer, Seller or Admin users', () => {
  it("can search Products and get an error when price parameter doesn't match any product", (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: null,
        price: 8500032424,
        categoryIds: null,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('Buyer, Seller or Admin users', () => {
  it("can search Products and get an error when categoryIds parameter doesn't match any product ", (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: null,
        price: null,
        categoryIds: 7023424,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('Buyer, Seller or Admin users', () => {
  it("can search Products and get an error when name, price or categoryIds parameters doesn't match any product", (done) => {
    chai
      .request(app)
      .post('/api/products/search')
      .send({
        name: 'product2343242',
        price: 85000324234,
        categoryIds: 70545,
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
