import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import dotenv from 'dotenv'
dotenv.config()
chai.should();
chai.use(chaiHttp);
//PROCESS
process
// USER LOGIN
const buyerLogin = {
  email: "ikevine@gmail.com",
    password: "Kevine@123",
};

const buyerLogin2={
        
  email: "irakozefrank@gmail.com",
  password: "Demo@12345"

  };
/// COOKIE
let buyerCookie = ''
// BUYER LOGIN REQUEST
describe('Buyer user', () => {
  it('Should return a success code 200 after successful authentication', (done) => {
    chai.request(app)
        .post('/api/users/login')
        .send(buyerLogin)
        .end((err, res) => {
          expect(res).to.have.status(200);
          buyerCookie=res.header['set-cookie'][0]
          done();
          });
       });
    });
    //CHECKING A PRODUCT IS NOT FOUND
describe('Product is not found',() => {
  it('should return code 404', (done)=>{
    chai.request(app)
    .post('/api/cart/400000')
    .set('cookie',buyerCookie)
    .end((err,res) => {
      expect(res).to.have.status(404)
      done()
    });
});
});

describe('Adding item to cart', () => {
  it('should add item to cart and return code 201', (done) => {
    chai.request(app)
      .post('/api/cart/16')
      .set('cookie', buyerCookie)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Items are added successfully');
        done();
      });
  });
});

  // CHECKING CART PRODUCT IF IS ALREADY EXIST
describe('Product already in cart',() => {
  it('should return code 409', (done)=>{
    chai.request(app)
        .post('/api/cart/16')
        .set('cookie',buyerCookie)
        .end((err,res) => {
          expect(res).to.have.status(409)
          done()
        });
  });
});

describe('Getting all products in cart', () => {
  it('should return all products and http code 200', (done) => {
    chai.request(app).get('/api/cart').set('cookie', buyerCookie)
    .end((err, res) => {
      expect(res).to.have.status(200)
      done();
    });
  });
});

describe('clearing all products in cart', () => {
  it('should delete all products in cart and http code 200', (done) => {
    chai.request(app).delete('/api/cart').set('cookie', buyerCookie)
    .end((err, res) => {
      expect(res).to.have.status(200)
      done();
    });
  });
});

