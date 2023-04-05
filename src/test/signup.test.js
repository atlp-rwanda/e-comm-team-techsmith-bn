import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import makeid from '../utils/random.js';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const user = {
  name: 'Test',
  email: `${makeid(5)}@gmail.com`,
  role: 1,
  password: 'Testing123',
};

const userExists = {
  name: 'Test',
  email: 'bel12@gmail.com',
  role: 2,
  password: 'password101',
};

const userInvalidEmail = {
  name: 'Test',
  email: `${makeid(10)}`,
  role: 1,
  password: 'Testing123',
};

describe('Signup Test', () => {
  // INVALID EMAIL OR PASSWORD
  describe('No email or password provided', () => {
    it('Should return a 400 status code indicating bad request', (done) => {
      chai
        .request(app)
        .post('/api/users/signup').send(userInvalidEmail)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  // IF A USER ALREADY EXISTS
  describe('User already exists', () => {
    
    it('Should return a 409 status code indicating conflict', (done) => {
      chai.request(app).post('/api/users/signup').send(userExists)
        .end((err, res) => {
          expect(res).to.have.status(409);
          done();
        });
    });
  });

  // 
});