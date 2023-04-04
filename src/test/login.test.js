import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import db from '../../database/models/index.js';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

// GOOD REQUEST
const loginUser = {
  email: 'gabby23@gmail.com',
  password: 'Gabby123@@@',
};

// UNKNOWN USER
const invalidEmail = {
  email: 'checkcehck@gmail.com',
  password: '123456',
};

// INVALID PASSWORD
const invalidPassword = {
  email: 'ne12@gmail.com',
  password: '123456',
};

describe('User authentication', () => {
  it('should return a response with status code 200', (done) => {
    chai.request(app)
      .get('/api/sample_test')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});
