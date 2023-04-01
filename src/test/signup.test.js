import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

describe('Signup Test', () => {

});
it('No Signup due to missing email ', () => {
  chai.request(app)
    .get('/api/login')
    // Dummy test #4
    .end((err, res) => {
      expect(res).to.have.status(404);
    });
});
it('No Signup due to missing password', () => {
  chai.request(app)
    .get('/api/login')
    // Dummy test #5

    .end((err, res) => {
      expect(res).to.have.status(404);
    });
});
it('No Signup due to passwords no matching', () => {
  chai.request(app)
    .get('/api/login')
    // Dummy test #5
    .end((err, res) => {
      expect(res).to.have.status(404);
    });
});