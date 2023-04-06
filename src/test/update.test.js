import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import  app  from '../server.js';


dotenv.config();
const { expect } = chai;
chai.should();
chai.use(chaiHttp);


describe('Update Password', () => {

    it('should return an error if old password is incorrect', (done) => {
        chai
            .request(app)
            .put('/api/users/update-password')

            .send({
                email:"keneon2003@gmail.com",
                oldPassword: 'Testin',
                newPassword: 'Testing@123',
                confPassword: 'Testing@123'
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have
                    .property('message')
                    .eql('Provide the correct password in the old password field');
                done();
            });
    });

    it('should return an error if new passwords do not match', (done) => {
        chai
            .request(app)
            .put('/api/users/update-password')
         
            .send({
                email:"keneon2003@gmail.com",
                oldPassword: 'Testing@123',
                newPassword: 'Testing',
                confPassword: 'Testing@123',
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('message').eql('Password do not match');
                done();
            });
    });

});
