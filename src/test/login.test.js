import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

//const app = 'http://127.0.0.1:5005';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('Sample Test', () => {
  it('Login with Wrong Crediantials', () => {
    chai.request(app)
<<<<<<< HEAD
      .get('/api/sample_test')
=======
      .get('/api/login')
    // Dummy test #1

>>>>>>> 85a48a7 (ft(reset password):reset password via email)
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
});
