import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const { expect } = chai;

chai.use(chaiHttp);

const userAdmin = {
  email: 'ntabanarene@gmail.com',
  password: 'rene@123',
};

const userId = 6365;

let cookie = '';

// LOGIN ADMIN
describe('Admin login', () => {
  it('should login admin and return cookie', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send(userAdmin)
      .end((err, res) => {
        cookie = res.header['set-cookie'][0];
        expect(res).to.have.status(200);
        done();
      });
  });
});

// CHANGE ROLE
describe('changeRole function', () => {
  // USER NOT FOUND
  describe('Given a user is not found', () => {
    it('should return 404 if user is not found', (done) => {
      chai
        .request(app)
        .put(`/api/users/100001/role/1`)
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
  // USER FOUND
  describe('Given a user is found and admin is logged in', () => {
    it('should update the user role and return success response', (done) => {
      chai
        .request(app)
        .put(`/api/users/${userId}/role/2`)
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
