import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.should();
chai.use(chaiHttp);

const buyerLogin = {
    email: 'payee@gmail.com',
    password: 'Password@00',
  },
  userLogin = {
    email: 'otheruser@gmail.com',
    password: 'Password@00',
  },
  orderId = 1001,
  otherOrderId = 1003,
  card = {
    number: 4242424242424242,
    exp_month: 12,
    exp_year: 2022,
    cvc: 123,
  };

let buyerCookie = '',
  userCookie = '';

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
  // USER LOGIN
  describe('Given a user wants to login', () => {
    it('should login a user', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send(userLogin)
        .end((err, res) => {
          res.should.have.status(202);
          userCookie = res.header['set-cookie'][0];
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
        .post(`/api/orders/${orderId}/pay`)
        .send(card)
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(409);
          done();
        });
    });
  });
  // ORDER DOES NOT EXIST
  describe('Given an order does not exist', () => {
    it('should return error 404 order not found', (done) => {
      chai
        .request(app)
        .post('/api/orders/100000/pay')
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
        .post(`/api/orders/${orderId}/pay`)
        .send(card)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
  // USER LOGGED IN BUT NOT A BUYER
  describe('Given a user is logged in but not a buyer', () => {
    it('should return error 403 forbidden', (done) => {
      chai
        .request(app)
        .post(`/api/orders/${orderId}/pay`)
        .send(card)
        .set('cookie', userCookie)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
  // USER LOGGED IN BUT DOES NOT OWN ORDER
    describe('Given a user is logged in but does not own the order', () => {
        it('should return error 403 forbidden', (done) => {
            chai
            .request(app)
            .post(`/api/orders/${otherOrderId}/pay`)
            .send(card)
            .set('cookie', buyerCookie)
            .end((err, res) => {
                res.should.have.status(403);
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
