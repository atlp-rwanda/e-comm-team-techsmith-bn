import chai from "chai";
import chaiHttp from "chai-http";
import { isReadable } from "nodemailer/lib/xoauth2";
import app from '../server.js'

chai.should()
chai.use(chaiHttp)
const {expect} = chai

// LOGIN THE ADMIN INORDER TO CONFIRM THE ORDER

const adminUser = {
    "email": "gabs0@gmail.com",
    "password": "@Gaby12345"
}

// REGULAR USER

const regularUser = {
    "email": "gabseller@gmail.com",
    "password": "@Gaby12345"
}


// ORDERS TO BE DELIVERD AND UNKNOWN ORDERS
const knownOrder = 1001;
const unknownOrder = 1002;
// order available but user deleted the account
const unAvailabelUser = 1003

// TOKENS
let adminCookie = '', regularCookie = '', adminToken = '', regularToken = '';


    describe('Admin login', () => {
      it('should return admin token', (done) => {
        chai.request(app)
          .post('/api/users/login')
          .send(adminUser)
          .end((err, res) => {
            expect(res).to.have.status(200);
            adminCookie = res.header['set-cookie'][0];
            adminToken = res.body.Authorization;
            console.log(adminCookie);
            done();
          });
      });
    });

// after login let us deliver and cancel some orders

describe('Delivered Order', () => {
    describe('Invalid Id was provided', () => {
        it('should recognize invalid order id 404', (done) => {
            chai.request(app)
            .put(`/api/orders/delivered/${unknownOrder}`)
            .set('cookie', adminCookie)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done()
            })

        })
    })

    // when successfully delivered
    describe('Order is marked as delivered', () => {
        it('should update the status to delivered', (done) => {
            chai.request(app)
            .put(`/api/orders/delivered/${knownOrder}`)
            .set('cookie', adminCookie)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done()
            })
        })
    })
})


// test the order cancellation set

describe('Cancel order and remark it as payed', () => {

    describe('Order cancelled successfully', () => {
        it('Should cancel the order', (done) => {
            chai.request(app)
            .put(`/api/orders/cancelled/${knownOrder}`)
            .set('Cookie', adminCookie)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done()
            })
        })
    })

})




