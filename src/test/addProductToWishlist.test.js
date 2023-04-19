import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";
import dotenv from 'dotenv'

dotenv.config()
chai.should();
chai.use(chaiHttp);

// USER LOGIN
const buyerLogin = {
  email:'Kevine440@gmail.com',
  password:'Testing@123',
};

// COOKIE
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

  // CHECKING WISHLIST PRODUCT IF IS ALREADY EXIST
describe('Product already in wishlist',() => {
  it('should return code 409', (done)=>{
    chai.request(app)
        .post('/api/wishlist/6')
        .set('cookie',buyerCookie)
        .end((err,res) => {
          expect(res).to.have.status(409)
          done()
        });
  });
});

//CHECKING A PRODUCT IS NOT FOUND
describe('Product is not found',() => {
  it('should return code 404', (done)=>{
    chai.request(app)
    .post('/api/wishlist/400000')
    .set('cookie',buyerCookie)
    .end((err,res) => {
      expect(res).to.have.status(404)
      done()
    });
});
});