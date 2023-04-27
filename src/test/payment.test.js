import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.should();
chai.use(chaiHttp);

const buyerLogin = {
  email: 'payee@gmail.com',
  password: 'Password@00',
};

const userLogin = {
    email: 'joshua@gmail.com',
    password: 'Testing@123',
  },
  orderExists = 1001,
  orderId = 68,
  otherOrderId = 266,
  card = {
    number: 4242424242424242,
    exp_month: 12,
    exp_year: 2022,
    cvc: 123,
  };

let buyerCookie = '', otherUserCookie = '';

/**
 * USER LOGIN TESTS
 */
describe('User login', () => {
  // BUYER LOGIN
  describe('Given a buyer wants to login', () => {
    it('should login a user', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send(buyerLogin)
        .end((err, res) => {
          res.should.have.status(200);
          buyerCookie = res.header['set-cookie'][0];
          done();
        });
    });
  });
  // OTHER USER LOGIN
  describe('Given a user wants to login', () => {
    it('should login a user', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send(userLogin)
        .end((err, res) => {
          res.should.have.status(200);
          otherUserCookie = res.header['set-cookie'][0];
          done();
        });
    });
  });
});

/**
 * PAYMENT TESTS
 */
describe('Payment Test', () => {
  // ORDER ALREADY PAID
  describe('Given an order is already paid for', () => {
    it('should return conflict 409 order already paid', (done) => {
      chai
        .request(app)
        .post(`/api/orders/${orderExists}/checkout`)
        .send(card)
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
  });
  // USER NOT BUYER
  describe('Given a logged in user is not a buyer', () => {
    it('should return error 403 forbidden', (done) => {
      chai
        .request(app)
        .post(`/api/orders/${orderId}/checkout`)
        .send({ card })
        .set('cookie', otherUserCookie)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  // ORDER DOES NOT EXIST
  describe('Given an order does not exist', () => {
    it('should return error 404 order not found', (done) => {
      chai
        .request(app)
        .post('/api/orders/100000/checkout')
        .send(card)
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  // USER NOT LOGGED IN
  describe('Given a user is not logged in', () => {
    it('should throw error of 401 unauthorized', (done) => {
      chai
        .request(app)
        .post(`/api/orders/${orderId}/checkout`)
        .send(card)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
  // USER DOES NOT OWN ORDER
  describe('Given a user does not own order', () => {
    it('should throw error of 403 unauthorized', (done) => {
      chai
        .request(app)
        .post(`/api/orders/${otherOrderId}/checkout`)
        .send(card)
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  // CLEANUP PAYMENT
  describe('Clear payment after successful test', () => {
    it('should return payment successful', (done) => {
      chai
        .request(app)
        .delete(`/api/payments/${orderId}`)
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});

// GET ALL PAYMENTS
describe('Get all payments', () => {
  // GET ALL PAYMENTS
  describe('Given a buyer wants to get all payments they have completed', () => {
    it('should return all payments', (done) => {
      chai
        .request(app)
        .get('/api/payments')
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
