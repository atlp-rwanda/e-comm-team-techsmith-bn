import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../server.js';
import makeid from '../utils/random.js';

dotenv.config();
const { expect } = chai;
chai.should();
chai.use(chaiHttp);

// AUTHORIZATION TOKEN
let cookie = '';

const user = {
  name: 'Joshua Karenzi',
  email: `${makeid(5)}@gmail.com`,
  password: 'Testing@123',
  role: 1,
  gender: 'male',
};

const adminLogin = {
  email: 'joshua@gmail.com',
  password: 'Testing@123',
};

// ADMIN LOGIN
describe('Admin Login', () => {
  it('Login and return admin cookie', (done) => {
    chai
      .request(app)
      .post('/api/users/login')
      .send(adminLogin)
      .end((err, res) => {
        cookie = res.header['set-cookie'][0];
        expect(res).to.have.status(200);
        done();
      });
  });
});

/* ADMIN CRUD */
describe('CRUD users by admin', () => {
  // GET ALL USERS
  describe('Admin should be able to get all users', () => {
    it('Admin should be able to get all users', (done) => {
      chai
        .request(app)
        .get('/api/admin/users')
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // CREATE NEW USER
  describe('Given a user is an admin', () => {
    it('Should create a new user', (done) => {
      chai
        .request(app)
        .post('/api/admin/users')
        .send(user)
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  // UPDATE USER
  describe('Given a user is an admin', () => {
    it('Should update a user', (done) => {
      chai
        .request(app)
        .put('/api/admin/users/1')
        .send({ name: `IRAKOZE ${makeid(5)}`, gender: 'M' })
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  // DELETE NON-EXISTING USER
  describe('Given a user is an admin and is trying to delete a non-existing user', () => {
    it('Should not delete a user and return error 404', (done) => {
      chai
        .request(app)
        .delete('/api/admin/users/10001001')
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});
