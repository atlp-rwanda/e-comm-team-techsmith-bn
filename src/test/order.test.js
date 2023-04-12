import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import makeid from '../utils/random.js';
import jwt from 'jsonwebtoken';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const user = {
  name: 'Test',
  email: `${makeid(5)}@gmail.com`,
  role: 1,
  id: makeid(5),
  password: 'Password@123',
  gender: 'M',
};

const loginUser = {
  email: user.email,
  password: user.password,
};

// ADMIN CAN GET ALL OORDERS
describe('Admin user', () => {
  it('can get all orders ', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        chai
          .request(app)
          .post('/api/users/login')
          .send(loginUser)
          .end((err, res) => {
            expect(res).to.have.status(200);
            const token = jwt.sign(
              { id: user.id, role: user.role },
              process.env.USER_SECRET,
              {
                expiresIn: 604800,
              }
            );
            chai
              .request(app)
              .get('/api/orders')
              .set('cookie', `Authorized=${token}`, {
                httpOnly: true,
                maxAge: 604800,
              })
              .end((err, res) => {
                expect(res).to.have.status(200);
                done();
              });
          });
      });
  });
});
