import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import makeid from '../utils/random.js';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const goodRequest = {
    name: 'Nishimwe',
    email: `${makeid(5)}@gmail.com`,
};

const invalidEmail = {
    name: 'John Doe',
    email: 'atlpemail',
};

const userExists = {
    name: 'John Doe',
    email: 'uteiy@gmail.com',
}

let token = '';

describe('Newsletter Subscription', () => {

    describe('Valid email', () => {
        it('should return a response with status code 201', (done) => {
            chai.request(app)
                .post('/api/users/request-newsletter')
                .send(goodRequest)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    done();
                    token = res.body.token;
                });
        });
    });

    describe('Confirm subscription', () => {
        it('should return a response with status code 200', (done) => {
            chai.request(app)
                .get(`/api/users/confirm-newsletter/${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    })

    describe('Invalid email', () => {
        it('should return a response with status code 400', (done) => {
            chai.request(app)
                .post('/api/users/request-newsletter')
                .send(invalidEmail)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    describe('User already exists', () => {
        it('should return a response with status code 409', (done) => {
            chai.request(app)
                .post('/api/users/request-newsletter')
                .send(userExists)
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    done();
                });
        });
    });

});