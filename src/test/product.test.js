import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import makeid from '../utils/random.js';
import { it } from 'mocha';
import jwt from 'jsonwebtoken';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

// LOAD ENVIRONMENT VARIABLES
const { USER_SECRET: secret } = process.env;

const goodProduct = {

  name: 'product' + makeid(10),
  image: [
  "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg",
  "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg",
  "https://www.pngwing.com/en/free-png-zbfan",
  "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg"
  ],
  price:85000,
  categoryId:70,
  condition:"New",
  description:"New Samsung A10 released in 2021",
  expiryDate:"2023-05-06T17:30:00.000Z"
  }
  //BAD PRODUCT
  const badProduct = {
    name: 'product' + makeid(10),
    image: [
    "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg",
    "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg",
    "https://www.pngwing.com/en/free-png-zbfan",
    "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg"
    ],
    price:85000,
    condition:"New",
    description:"New Samsung A10 released in 2021",
    expiryDate:"2023-05-06T17:30:00.000Z"
    }

// INITIALIZING AUTHORIZATION COOKIE
let sellerCookie = '', twoFAToken = '';

// SELLER LOGIN
const sellerLogin = {
  email: 'atlpseller@gmail.com',
  password: 'Password@00',
};

// SELLER LOGIN REQUEST
describe('Seller Login', () => {
  it('Login and return seller token for two factor authentication', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send(sellerLogin)
      .end((err, res) => {
        twoFAToken = res.body.token;
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
      .get(`/api/users/login/${twoFAToken}`)
      .end((err, res) => {
        sellerCookie = res.header['set-cookie'];
        expect(res).to.have.status(200);
        done();
      });
  });
});

// add product test
describe('Add  product', () => {
  describe('User active', () => {
    describe('All information provided', () => {
      it('Should add a product and return code 200', (done) => {
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
  describe('User inactive', () => {
    const sellerInactiveCookie =
      'Authorized=' + jwt.sign({ id: 17 }, 'atlpcohort28teamprojecttechsmith');
    it('Should return code 403', (done) => {
      chai
        .request(app)
        .post('/api/products')
        .send(goodProduct)
        .set('cookie', sellerInactiveCookie)
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });
});

// USER CAN GET ALL OORDERS
describe('Buyer, Seller or Admin users', () => {
  it('can display all Product ', (done) => {
    chai
      .request(app)
      .post('/api/products/all')
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
      .post('/api/products/all')
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
      .post('/api/products/all')
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
      .post('/api/products/all')
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
      .post('/api/products/all')
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
  it('can search Products and get an error when name parameter doesn\'t match any product', (done) => {
    chai
      .request(app)
      .post('/api/products/all')
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
  it('can search Products and get an error when price parameter doesn\'t match any product', (done) => {
    chai
      .request(app)
      .post('/api/products/all')
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
  it('can search Products and get an error when categoryIds parameter doesn\'t match any product ', (done) => {
    chai
      .request(app)
      .post('/api/products/all')
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
  it('can search Products and get an error when name, price or categoryIds parameters doesn\'t match any product', (done) => {
    chai
      .request(app)
      .post('/api/products/all')
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