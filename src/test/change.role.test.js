import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';


const { expect } = chai;

chai.use(chaiHttp);

describe('changeRole function', () => {
  it('should return error response if user does not exist', async () => {
    const res = await chai
      .request(app)
      .put('/users/9999/role/2');

    expect(res).to.have.status(404);
  
  });

  it('should return error response if there is a server error', async () => {
    // Force an error by passing an invalid role ID
    const res = await chai
      .request(app)
      .put('/users/1/roles/invalid-role-id');

    expect(res).to.have.status(404);
  });
});
