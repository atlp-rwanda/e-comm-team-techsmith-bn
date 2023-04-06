import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../server.js';
import makeid from '../utils/random.js';
import dotenv from 'dotenv';

dotenv.config();

const { describe, it } = require('mocha');

const chai = require('chai');
chai.should();
chai.use(chaiHttp);
const { expect } = chai;


const user = {
    name: 'Test',
    email: `${makeid(5)}@gmail.com`,
    role: 3,
    password: 'Testing123',
    gender: 'M'
};

describe('Signup Test', () => {
    // INVALID EMAIL OR PASSWORD
    describe('No email or password provided', () => {
        it('Should return a 201 ', (done) => {
            chai.request(app)
                .post('/api/users/signup')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});

// GOOD REQUEST
const loginUser = {
    email: 'parfaitetwagira2003@gmail.com',
    password: '$2b$10$UyFfWtkc5MNHbasmk9USGeR9us1g3YcrCZfC8hiH1RHYe8leOBDUi',
};




describe('User authentication', () => {
    it('should return a response with status code 404', (done) => {
        chai.request(app)
            .post('/api/users/login').send(loginUser)
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
                done();
            });
    });
});



describe('testing password reset', () => {

    it('should request password reset email', () => {
        request(app).post('/api/password/requestReset').send({
            email: 'parfaitetwagira@gmail.com'
        }).end((err, res) => {
            chai.expect(res.body).to.be.a('object');
        });
    });

    it('should request password reset email', () => {
        request(app).post('/api/password/requestReset').send({

        }).end((err, res) => {
            chai.expect(res).to.have.status(404);
        });
    });
    it('should reset password', () => {
        request(app)
            .post(`/api/password/reset-password/${process.env.TOKEN}`)
            .send({
                password: 'newpassword'
            }).end((error, res) => {
                chai.expect(res).to.have.status(400);
            });
    });


    it('should get users', () => {
        request(app)
            .get('/api/users/')
            .end((error, res) => {
                chai.expect(res).to.have.status(200);
            });
    });
});
