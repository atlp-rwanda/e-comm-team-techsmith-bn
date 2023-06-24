import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';


const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let sellerCookie = '',
  twoFAToken = '';
const seller ={
    "email": "gabs1@gmail.com",
    "password": "@Gaby12345"
}


describe('Seller login', () => {
    it('Should return 200 ', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send(seller)
        .end((err, res) => {
          twoFAToken = res.body.token;
          expect(res).to.have.status(202);
          done();
        });
    });
  });

  describe('Seller 2FA', () => {
    it('Confirm 2FA and return seller cookie', (done) => {
      chai
        .request(app)
        .get(`/api/users/login/${twoFAToken}/?email=${seller.email}`)
        .end((err, res) => {
          sellerCookie = res.header['set-cookie'];
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('Seller Statistics', () => {
    it('Return statistics of a seller with a 200 status code ', (done) => {
      chai
        .request(app)
        .post(`/api/statistics/seller`)
        .set('cookie', sellerCookie)
        .end((err, res) => {
          sellerCookie = res.header['set-cookie'];
          expect(res).to.have.status(200);
          done();
        });
    });
  });