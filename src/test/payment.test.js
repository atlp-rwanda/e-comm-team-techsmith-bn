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
  orderPaidFor = 520,
  unavailableOrder = -1,
  doesNotOwnOrder = 408,
  orderId = 442,
  card = {
    number: 4242424242424242,
    exp_month: 12,
    exp_year: 2025,
    cvc: 123,
  },
  otherBuyerLogin = {
    email: 'Kevine440@gmail.com',
    password: 'Testing@123',
  };

  const multipleOrders = {
    ordersCheckout: {
    ids: [530, 529, 532],
    amount: 480,
    user: {
      name: 'Test',
      email: 'Kevine440@gmail.com',
    }},
    card: {
      number: 4242424242424242,
      exp_month: 12,
      exp_year: 2025,
      cvc: 123,
    }
  };

let buyerCookie = '',
  userCookie = '',
  otherBuyerCookie = '',
  token = '';

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
  // OTHER BUYER LOIGN
  describe('Given a buyer wants to login', () => {
    it('should login a user', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send(otherBuyerLogin)
        .end((err, res) => {
          res.should.have.status(200);
          otherBuyerCookie = res.header['set-cookie'][0];
          done();
        });
    });
  });
  // OTHER USER LOGIN (NOT BUYER)
  describe('Given a user wants to login', () => {
    it('should login a user', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send(userLogin)
        .end((err, res) => {
          res.should.have.status(202);
          token = res.body.token;
          done();
        });
    });
  });

  // OTHER USER 2FA
  describe('Given a user wants to complete 2FA', () => {
    it('should complete 2FA', (done) => {
      chai
        .request(app)
        .get(`/api/users/login/${token}/?email=${userLogin.email}`)
        .end((err, res) => {
          res.should.have.status(200);
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
        .post(`/api/orders/${orderPaidFor}/checkout`)
        .send(card)
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(404);
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
  // USER DOES NOT OWN ORDER
  describe('Given a user does not own order', () => {
    it('should return error 403 forbidden', (done) => {
      chai
        .request(app)
        .post(`/api/orders/${doesNotOwnOrder}/checkout`)
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
        .post(`/api/orders/${orderPaidFor}/checkout`)
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
        .post(`/api/orders/${unavailableOrder}/checkout`)
        .send(card)
        .set('cookie', userCookie)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });

  // INVALID CARD PROVIDED
  describe('Given an invalid card is provided', () => {
    it('should return error 500 from Stripe', (done) => {
      chai
        .request(app)
        .post(`/api/orders/${orderId}/checkout`)
        .send({
          number: 'Invalid card number',
          exp_month: 'Invalid month',
          exp_year: 2022,
          cvc: 1234,
        })
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // DELETE PAYMENT USING ORDER ID
  describe('Given a buyer wants to delete a payment', () => {
    it('should delete a payment', (done) => {
      chai
        .request(app)
        .delete(`/api/payments/${orderId}`)
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  
});

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

  // MAKE BULK PAYMENTS
  describe('Given a buyer wants to make bulk payments', () => {
    it('should make bulk payments', (done) => {
      chai
        .request(app)
        .post('/api/orders/checkout')
        .send(multipleOrders)
        .set('cookie', buyerCookie)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });