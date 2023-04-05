import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

//const app = 'http://127.0.0.1:5005';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

// GOOD REQUEST
const loginUser = {
  email: 'gabby23@gmail.com',
  password: 'Gabby123@@@',
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
