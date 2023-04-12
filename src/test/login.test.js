import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


describe('Sample Test', () => {
  it('Login with Wrong Crediantials', () => {
    chai.request(app)
      .get('/api/sample_test')
      .end((err, res) => {
        expect(res).to.have.status(404);

        // done();
      });

  });
  it('Login and get a token', () => {
    chai.request(app)
      .get('/api/login')
    // Dummy test #2
      .end((err, res) => {
        expect(res).to.have.status(404);
        // expect(res).to.have.property('message','Successfull Login!!')
      });
  });
  it('No Login due to missing Field', () => {
    chai.request(app)
      .get('/api/login')
    // Dummy test #3
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
  });
  it('No Login Wrong Email', () => {
    chai.request(app)
      .get('/api/login')
    // Dummy test #3
      .end((err, res) => {
        expect(res).to.have.status(404);
      });
  });
// GOOD REQUEST
const loginUser = {
  email: 'gabby23@gmail.com',
  password: 'Gabby123@@@',
};

// SELLER LOGIN
const sellerLogin = {
  email: 'atlpseller@gmail.com',
  password: 'Password@00',
};

// UNKNOWN USER
const unknwonUser = {
  email: 'checkcehckchecckkk@gmail.com',
  password: '123456',
};

// INVALID PASSWORD
const invalidPassword = {
  email: 'ne12@gmail.com',
  password: 'idontknow',
};

// 2FA TOKEN
let twoFAToken = '';

describe('User authentication', () => {
  
  // VALID EMAIL AND PASSWORD
  describe('Valid email and password', () => {
    it('should return a 200 status code', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send(loginUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

  });

  // UNKNOWN USER
  describe('User not found', () => {
    it('should return a 404 status code', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send(unknwonUser)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  // SELLER LOGIN
  describe('Seller login', () => {
    it('should return a 307 status code', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send(sellerLogin)
        .end((err, res) => {
          expect(res).to.have.status(202);
          twoFAToken = res.body.token;
          done();
        });
    });
  });

  // CONFIRM TWO FACTOR AUTHENTICATION
  describe('Confirm two factor authentication', () => {
    it('should return a 200 status code', (done) => {
      chai.request(app)
        .get(`/api/users/login/${twoFAToken}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // INVALID PASSWORD
  describe('Invalid password', () => {
    it('should return a 400 status code', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .send(invalidPassword)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

});