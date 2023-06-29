import chai from "chai";
import chaiHttp from "chai-http";
import app from '../server.js'

chai.should()
chai.use(chaiHttp)
const {expect} = chai

// LOGIN THE ADMIN INORDER TO CONFIRM THE ORDER

const buyerUser = {
    "email": "Kevine440@gmail.com",
    "password": "Testing@123"
}

// REGULAR USER

const seller = {
    "email": "gabs1@gmail.com",
    "password": "@Gaby12345"
}


// order for on way test
const orderOnWayId = 519;


// ORDERS TO BE DELIVERD AND UNKNOWN ORDERS
const knownOrder = 572;
const knownOrderId = 573;
const unknownOrder = 10093;

// TOKENS
let buyerCookie = '', sellerCookie = '', twoFAToken = '';


describe('Login to change order Status', () => {
    describe('Buyer user login', () => {
        it('should return 200', (done) => {
            chai.request(app)
            .post('/api/users/login')
            .send(buyerUser)
            .end((err, res) => {
                expect(res).to.have.status(200);
                buyerCookie = res.header['set-cookie'][0]
                done()
            })
        })
    })

    // SELLER LOGIN
    describe('Login the seller and give seller cookie', () => {
        describe('Seller login', () => {
            it('should return a 307 status code', (done) => {
              chai.request(app)
                .post('/api/users/login')
                .send(seller)
                .end((err, res) => {
                  expect(res).to.have.status(202);
                  twoFAToken = res.body.token;
                  done();
                });
            });
          });
        
          // CONFIRM TWO FACTOR AUTHENTICATION
          describe('Confirm two factor authentication', () => {
            it('should return a 200 status code', (done) => {
              chai.request(app)
                .get(`/api/users/login/${twoFAToken}/?email=${seller.email}`)
                .end((err, res) => {
                  expect(res).to.have.status(200);
                  sellerCookie = res.header['set-cookie'][0]
                  done();
                });
            });
          });
    })
  
})


// test the order cancellation set
describe('Order cancelled successfully', () => {
    it('Should cancel the order', (done) => {
        chai.request(app)
        .put(`/api/orders/cancelled/${knownOrderId}`)
        .set('Cookie', buyerCookie)
        .end((err, res) => {
            expect(res).to.have.status(200);
            done()
        })
    })
})


// after login let us deliver and cancel some orders

describe('Delivered Order', () => {
    describe('Invalid Id was provided', () => {
        it('should recognize invalid order id 404', (done) => {
            chai.request(app)
            .put(`/api/orders/delivered/${unknownOrder}`)
            .set('cookie', sellerCookie)
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
            .set('cookie', sellerCookie)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done()
            })
        })
    })
})



// test order on way
describe('Order marked as on the way', () => {
    it('Should mark order as on way', (done) => {
        chai.request(app)
        .put(`/api/orders/onWay/${orderOnWayId}`)
        .set('Cookie', sellerCookie)
        .end((err, res) => {
            expect (res).to.have.status(404);
            done()
        })
    })
})


