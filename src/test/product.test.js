import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import makeid from '../utils/random.js';
import { it } from 'mocha';
import jwt from 'jsonwebtoken';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

// LOAD ENVIRONMENT VARIABLES
const { USER_SECRET: secret } = process.env;

const goodProduct = {

        name: 'product' + makeid(10),
        image: [
            "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg",
            "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg",
            "https://www.pngwing.com/en/free-png-zbfan",
            "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg"
        ],
        price: 85000,
        categoryId: 70,
        condition: "New",
        description: "New Samsung A10 released in 2021",
        expiryDate: "2023-05-06T17:30:00.000Z"
    }
    //BAD PRODUCT
const badProduct = {
    name: 'product' + makeid(10),
    image: [
        "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/02/ipad-air-4-2021-test.jpg",
        "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/03/ipad-air-4-geeketc.jpg",
        "https://www.pngwing.com/en/free-png-zbfan",
        "https://usercontent.one/wp/www.geeketc.fr/wp-content/uploads/2021/04/ipad-air-4-geeketc.jpg"
    ],
    price: 85000,
    condition: "New",
    description: "New Samsung A10 released in 2021",
    expiryDate: "2023-05-06T17:30:00.000Z"
}

// INITIALIZING AUTHORIZATION COOKIE
let sellerCookie = '',
    twoFAToken = '';

// SELLER LOGIN
const sellerLogin = {
    email: 'atlpseller@gmail.com',
    password: 'Password@00',
};

//SELLER COLLECTION
const sellerCollection = [
    { id: 81 }, { id: 82 }, { id: 83 }, { id: 84 }, { id: 85 },
    { id: 86 }, { id: 92 }, { id: 87 }, { id: 88 }, { id: 89 },
    { id: 90 }, { id: 91 }, { id: 93 }, { id: 94 }, { id: 95 },
]

// SELLER LOGIN REQUEST
describe('Seller Login', () => {
    it('Login and return seller token for two factor authentication', (done) => {
        chai
            .request(app)
            .post('/api/users/login')
            .send(sellerLogin)
            .end((err, res) => {
                twoFAToken = res.body.token;
                expect(res).to.have.status(202);
                done();
            });
    });
});

// SELLER CONFIRM TWO FACTOR AUTHENTICATION
describe('Seller 2FA', () => {
    it('Confirm 2FA and return seller cookie', (done) => {
        chai
            .request(app)
            .get(`/api/users/login/${twoFAToken}`)
            .end((err, res) => {
                sellerCookie = res.header['set-cookie'];
                expect(res).to.have.status(200);
                done();
            });
    });
});

// add product test
describe('Add  product', () => {
    describe('User active', () => {
        describe('All information provided', () => {
            it('Should add a product and return code 200', (done) => {
                chai
                    .request(app)
                    .post('/api/products')
                    .send(goodProduct)
                    .set('cookie', sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        done();
                    });
            });
        });
        describe('Information not provided', () => {
            it('Should return code 400', (done) => {
                chai
                    .request(app)
                    .post('/api/products')
                    .send(badProduct)
                    .set('cookie', sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
        });

        describe('Adding existing product', () => {
            it('Should return code 409', (done) => {
                chai
                    .request(app)
                    .post('/api/products')
                    .send(goodProduct)
                    .set('cookie', sellerCookie)
                    .end((err, res) => {
                        expect(res).to.have.status(409);
                        done();
                    });
            });
        });
    });
    describe('User inactive', () => {
        const sellerInactiveCookie =
            'Authorized=' + jwt.sign({ id: 17 }, 'atlpcohort28teamprojecttechsmith');
        it('Should return code 403', (done) => {
            chai
                .request(app)
                .post('/api/products')
                .send(goodProduct)
                .set('cookie', sellerInactiveCookie)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    });
    describe('Seller products', () => {
        it('Should return code 200', (done) => {
            chai
                .request(app)
                .get('/api/products/available')
                .set('cookie', sellerCookie)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

});
// describe('Check Expiration of products', () => {
//   it('Should return Code 200 and valid response data', async () => {
//     try {
//       const response = await chai.get('/api/products/expiration');
//       expect(response).to.have.status(200);
//       expect(response).to.be.json;
//       expect(response.body).to.have.property('exprired_Products');
//       // Additional assertions on response data can be added here
//     } catch (err) {
//       // Proper error handling
//       throw err;
//     }
//   });
// });
describe('Check Expiration of products', () => {
    it('Should return Code 200 and valid response data', (done) => {
        chai
            .request(app)
            .get('/api/products/expiration')
            // .set('cookie', cookie)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Available products', () => {
    describe('Products in stock', () => {
        it('Should get  products and return code 200', (done) => {
            chai
                .request(app)
                .get('/api/products/allAvailable')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
describe('All products', () => {
    describe('List of products', () => {
        it('Should get  products and return code 200', (done) => {
            chai
                .request(app)
                .get('/api/products')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});