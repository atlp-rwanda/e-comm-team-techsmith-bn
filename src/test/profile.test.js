import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

// Setting up Userscribe
const user1 = {
  email: 'ikevine@gmail.com',
  password: 'Kevine@123',
};

const user1Id = 394;

const updateUser = {
  name: 'Iradukunda Kellen',
  physicalAddress: 'Ghana',
};

let cookie = '';

describe('Update user info', () => {
  it('should update user info ', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        cookie = res.header['set-cookie'][0];
        chai
          .request(app)
          .put(`/api/users/${user1Id}`)
          .set('cookie', cookie)
          .send(updateUser)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
  });
});
