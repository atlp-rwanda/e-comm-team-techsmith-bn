import chai from 'chai';
import chaiHttp from 'chai-http';
// import app from '../server.js';

const app ="http://127.0.0.1:5005"

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('Login  Test', () => {
  it('should return a response with status code 200', (done) => {
    chai.request(app)
      .get('/api/sample_test')
      .end((err, res) => {
        chai.expect(res).to.have.status(200);
        done();
      });
  });
});

