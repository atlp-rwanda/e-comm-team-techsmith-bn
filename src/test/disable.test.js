import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;


const admin = {
    "email": "gabs0@gmail.com",
    "password": "@Gaby12345"
}

const regularUser = {
    "email": "gabs2@gmail.com",
    "password": "@Gaby12345"
}


const regularUserId = 10
const unkownUserId = 1067

// TOKENS
let adminCookie = '', regularCookie = '', adminToken = '', regularToken = '';


describe('Login test', () => {
    describe('Admin login', () => {
      it('should return admin token', (done) => {
        chai.request(app)
          .post('/api/users/login')
          .send(admin)
          .end((err, res) => {
            expect(res).to.have.status(200);
            adminCookie = res.header['set-cookie'][0];
            adminToken = res.body.Authorization;
            console.log(adminCookie);
            done();
          });
      });
    });



    describe('Regular user login', () => {
        it('should return a regular token', (done) => {
            chai.request(app)
            .post('/api/users/login')
            .send(regularUser)
            .end((err, res) => {
                expect(res).to.have.status(202);
                regularCookie = res.header['set-cookie'][0];
                regularToken = res.body.Authorization;
                console.log(regularCookie);
                done();
            })
        })
    })
});


describe('Disable user', () => {
    describe('User is enabled', () => {
        it('Should disable a user', (done) => {
            chai.request(app)
            .put(`/api/users/disable/${regularUserId}`)
            .set('cookie', adminCookie)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })
    });
    describe('User is not found', () => {
        it('Should return an error 404', (done) => {
            chai.request(app)
            .put(`/api/users/disable/${unkownUserId}`)
            .set('cookie', adminCookie)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            })
        })
    })
});

describe('Enable user', () => {
    describe('User not found', () => {
        it('Should return error 404', (done) => {
            chai.request(app)
            .put(`/api/users/enable/${unkownUserId}`)
            .set('cookie', adminCookie)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            })
        })
    });
    describe('User is disabled', () => {
        it('Should enable a user', (done) => {
            chai.request(app)
            .put(`/api/users/enable/${regularUserId}`)
            .set('cookie', adminCookie)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        })
    })
})