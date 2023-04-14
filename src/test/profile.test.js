import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../server.js';
import jwt from 'jsonwebtoken';

dotenv.config();
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
  name: 'Updated Ken Buyer',
  physicalAddress: 'Ghana',
};

let token = '';

describe('Update user info', () => {
  it('should update user info ', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        token = jwt.sign({ id: user1Id }, process.env.USER_SECRET, {
          expiresIn: 604800,
        });
        console.log(token);
        chai
          .request(app)
          .put(`/api/users/${user1Id}`)
          .set('Cookie', `Authorized=${token}`, {
            httpOnly: true,
            maxAge: 604800,
          })
          .send(updateUser)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
  });
});
