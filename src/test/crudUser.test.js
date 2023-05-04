import * as chai from 'chai';
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

  // STATUS CODE OF 500 NEED TO BE TESTED
  
  // THE STATUS CODE OF 404 ALSO NEED TO BE DONE


  describe('Admin want to get all user but on unexisting page ', () => {
    it('Should not get any user and return error 404', (done) => {
      chai
        .request(app)
        .get('/api/admin/users?page=5000')
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(404);
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


  // THE STATUS CODE OF 401 SHOULD BE TESTED
  
  describe('An Invalid user want to login', () => {
    it('Should not create create a new user and get 401', (done) => {
      chai
        .request(app)
        .post('/api/admin/users')
        .send(!user)
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  // THE STATUS CODE OF 409 SHOULD BE TESTED



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
})

// user routes
describe('Getting one user', () => {
  // GET ALL USERS
  describe(' should be able to get a user', () => {
    it('user should be able to get a user', (done) => {
      chai
        .request(app)
        .get('/api/users/394')
        .set('cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  })
});
