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
  description: 'New Samsung A23 released in 2022',
  image: [
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Fages.unsplash.png',
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.png',
    'https://www.google.com/imgres?imgurl=https%3A%2F%2ages.unsplash.png',
    'https://www.google.com/imgres?imgurl=https%3A%2FFimages.unsplash.png',
  ],
  condition: 'New',
  price: 900,
  categoryId: 4,
  expiryDate: '2023-04-06 10:30:00-07:00',
};
const badProduct = {
  name: 'product' + makeid(10),
  description: 'New Samsung A23 released in 2022',
  image: [
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Fages.unsplash.png',
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.png',
    'https://www.google.com/imgres?imgurl=https%3A%2F%2ages.unsplash.png',
    'https://www.google.com/imgres?imgurl=https%3A%2FFimages.unsplash.png',
  ],
  condition: 'New',
  price: 900,
  expiryDate: '2023-04-06 10:30:00-07:00',
};

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
