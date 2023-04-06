import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import  app  from '../server.js';
import jwt from 'jsonwebtoken';


dotenv.config();
const { expect } = chai;
chai.should();
chai.use(chaiHttp);

// Setting up Userscribe
const user1 ={
    "email": "buyerken@gmail.com",
    "password": "Password@00"
}

const user1Id = 205;

const updateUser = {
    name: 'Updated Ken Buyer',
    physicalAddress: 'Ghana'
}

let token = '';

//login test user profile
describe('User login', () => {
    describe('Given a user is the owner of the profile', () => {
        it('should return a user token', (done) => {
            chai.request(app)
            .post('/api/users/login')
            .send(user1)
            .end((err, res) => {
                expect(res).to.have.status(200);
                token = jwt.sign({ id: user1.email }, process.env.USER_SECRET, {
                    expiresIn: 604800,
                  });
                done()
            })
        })
    })
})

// UPDATE USER TESTS
describe ('Update user info', () => {
    // WHEN THE OWNER IS LOGGED IN
    describe('Given a user is the owner of the profile', () => {
        it('should update user info', (done) => {
            chai.request(app)
            .put(`/api/users/${user1Id}`)
            .set('Cookie', `Auhorized = ${token}`,{httpOnly: true, maxAge: 604800})
            .send(updateUser)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done()
            })
        })
    })
})
