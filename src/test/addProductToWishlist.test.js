import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../server.js';

dotenv.config();
chai.should();
chai.use(chaiHttp);
// USER LOGIN
const buyerLogin = {
  email: 'Kevine440@gmail.com',
  password: 'Testing@123',
};
// COOKIE
let buyerCookie = '';
// BUYER LOGIN REQUEST
describe('Buyer user', () => {
  it('Should return a success code 200 after successful authentication', (done) => {
    chai.request(app)
        .post('/api/users/login')
        .send(buyerLogin)
        .end((err, res) => {
          expect(res).to.have.status(200);
          buyerCookie = res.header['set-cookie'][0];
          done();
          });
       });
    });
    //ADDING PRODUCT INTO WISHLIST
    describe('adding product into wishlist', () => {
      it('should return all products and http code 201', (done) => {
        chai.request(app)
        .post('/api/wishlist/690')
        .set('cookie', buyerCookie)
        .end((err, res) => {
          expect(res).to.have.status(201)
          done();
        });
      });
  });

// ADDING PRODUCT INTO WISHLIST
describe('adding product into wishlist', () => {
  it('should return all products and http code 201', (done) => {
    chai
      .request(app)
      .post('/api/wishlist/690')
      .set('cookie', buyerCookie)
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });
});
// CHECKING A PRODUCT IS NOT FOUND
describe('Product is not found', () => {
  it('should return code 404', (done) => {
    chai
      .request(app)
      .post('/api/wishlist/400000')
      .set('cookie', buyerCookie)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
// GETING ALL WISHLIST
describe('Getting all products in wishlist', () => {
  it('should return all products and http code 200', (done) => {
    chai
      .request(app)
      .get('/api/wishlist/')
      .set('cookie', buyerCookie)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
// PRODUCT ALREADY EXISTS
describe(' product already in wishlist', () => {
  it('should return product already in wishlist and http code 409', (done) => {
    chai.request(app)
    .post('/api/wishlist/690')
    .set('cookie', buyerCookie)
    .end((err, res) => {
      expect(res).to.have.status(409)
      done();
    });
  });
});

// DELETE SINGLE PRODUCT FROM WISHLIST
describe('delete single prouduct from wishlist', () => {
  it('should return status code 200', (done) => {
    chai.request(app)
    .delete('/api/wishlist/690')
    .set('cookie', buyerCookie)
    .end((err, res) => {
      expect(res).to.have.status(200)
      done();
    });
  })
})

