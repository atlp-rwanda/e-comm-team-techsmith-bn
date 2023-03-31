import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../server.js';

const { describe, it } = require('mocha');

const chai = require('chai');

chai.should();
chai.use(chaiHttp);
// const { expect } = chai;

describe('testing password reset', () => {
  const resetToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmZhaXRldHdhZ2lyYUBnbWFpbC5jb20iLCJpYXQiOjE2ODA0NDYxMjcsImV4cCI6MTY4MDQ0OTcyN30.T7XsdFEI0ft0xW6MFFPvWjF3mkvihgB6RToIoGD5Ryk';
  it('should request password reset email', () => {
    request(app).post('/password/requestReset').send({
      email: 'parfaitetwagira@gmail.com'
    }).end((err, res) => {
      chai.expect(res.body).to.be.a('object');
    });
  });

  it('should request password reset email', () => {
    request(app).post('/password/requestReset').send({

    }).end((err, res) => {
      chai.expect(res).to.have.status(404);
    });
  });
  it('should reset password', () => {
    request(app)
      .post(`/api/password/reset-password/${resetToken}`)
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
