import chai, { expect } from 'chai';
import app from '../server.js';
import Notification from '../controllers/notificationController';

// SELLER CREDENTIALS
const seller = {
  email: 'atlpseller@gmail.com',
  password: 'Password@00',
};

/**
 * MUTABLE VARIABLES
 */
// TOKEN
let token = '',
    // NOTIFICATION ID
    notificationId = '';
    // AUTHENTICATION VARIABLES
let sellerCookie = '',
otherCookie = '';


// NOTIFICATION TEST VARIABLES
const createNotification = {
    userId: 115,
    title: 'Test notification',
    body: 'This is a test notification',
};

// CREATE LOGIN TEST
describe('Seller login', () => {
  // PROCEED TO 2FA
  describe('Seller initial login', () => {
    it('should return a partial success code 202 ahead of two facto authentication', (done) => {
      chai
        .request(app)
        .post('/api/users/login')
        .send(seller)
        .end((err, res) => {
          expect(res).to.have.status(202);
          token = res.body.token;
          done();
        });
    });
  });
  // COMPLETE TWO FACTOR AUTHENTICATION
  describe('Seller two factor authentication', () => {
    it('should return a success code 200 after successful authentication', (done) => {
      chai
        .request(app)
        .get(`/api/users/login/${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          sellerCookie = res.header['set-cookie'][0];
          done();
        });
    });
  });
});

/**
 * NOTIFICATION TESTS
 */

describe('Notification Controller', () => {
  // GET ALL NOTIFICATIONS
  describe('Get all notifications', () => {
    it('Should return all notifications and success code 200', (done) => {
      chai
        .request(app)
        .get('/api/notify')
        .set('cookie', sellerCookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  // GET UNREAD NOTIFICATIONS
  describe('Get unread notifications', () => {
    it('Should return unread notifications and success code 200', (done) => {
      chai
        .request(app)
        .get('/api/notify/unread')
        .set('cookie', sellerCookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  // READ ALL NOTIFICATIONS
  describe('Read all notifications', () => {
    it('Should return all notifications and success code 200', (done) => {
      chai
        .request(app)
        .get('/api/notify/read')
        .set('cookie', sellerCookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  // CREATE NOTIFICATION
  describe('Create notification', () => {
    // IF PROVIDED DATA IS VALID
    describe('Given the provided data is valid', () => {
      it('Should return an object with dataValues property', async () => {
        let res = '';
        const newNotification = await Notification.createNotification(
          createNotification.userId,
          createNotification.title,
          createNotification.body,
          res
        );
        notificationId = newNotification.dataValues.id;
        chai.expect(newNotification).to.have.property('dataValues');
      });
    });
    // IF PROVIDED DATA IS INVALID
    describe('Given the provided data is invalid', () => {
      it('Should return an error', async () => {
        let res;
        const response = await Notification.createNotification('Invalid data', 'Invalid data', 'Invalid status', res);
        chai.expect(response).to.not.have.property('dataValues');
      });
    });
  });
  // READ SINGLE NOTIFICATION
  describe('Read single notification', () => {
    // IF NOTIFICATION DOES NOT EXIST
    describe('Given the notification does not exist', () => {
      it('Should return a failure code 404', (done) => {
        chai
          .request(app)
          .put(`/api/notify/0`)
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });
    // IF NOTIFICATION EXISTS
    describe('Given the notification exists', () => {
        console.log(notificationId);
      it('Should return a success code 200', (done) => {
        chai
          .request(app)
          .put(`/api/notify/${notificationId}`)
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
  // DELETE NOTIFICATION
  describe('Delete notification', () => {
    // IF NOTIFICATION DOES NOT EXIST
    describe('Given the notification does not exist', () => {
      it('Should return a failure code 404', (done) => {
        chai
          .request(app)
          .delete('/api/notify/0')
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
      });
    });
    // IF NOTIFICATION EXISTS
    describe('Given the notification exists', () => {
      it('Should return a success code 200', (done) => {
        chai
          .request(app)
          .delete(`/api/notify/${notificationId}`)
          .set('cookie', sellerCookie)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });
});