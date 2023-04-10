import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import  app  from '../server.js';
import jwt from 'jsonwebtoken'
import makeId from '../utils/random.js'

dotenv.config();
const { expect } = chai;
chai.should();
chai.use(chaiHttp);


let token= ''
const user={
    "name": "Jean Jules IRAKOZE",
    "email":`${makeId(5)}@gmail.com`,
    "password":"Jules123",
    "role":"10",
    "gender": "male"
}
describe('CRUD users by admin', () => {

    it('should return All Users', (done) => {
        chai
            .request(app)
            .get('/api/admin')

            .end((err, res) => {
              expect(res).to.have.status(200);
               
                done();
            });
    });

    it('Admin should be able to create a user', (done) => {
        chai
            .request(app)
            .post('/api/users/login')
         
            .send({
                "email": "gabs0@gmail.com",
                "password": "@Gaby12345"
            })
            .end((err, res) => {
              expect(res).to.have.status(200)
            token = jwt.sign({id: user.email,role:user.role}, process.env.USER_SECRET,{expiresIn:604800})
                
            });


            chai.request(app)
            .post('/api/admin')

            .send(user)
            .set('Cookie', `Authorized=${token}`,{httpOnly: true, maxAge:604800})
            .end((err,res) =>{ 
                expect(res).to.have.status(201)
                done()

            })
            it('UPdating user by admin', (done)=>{
                chai 
                .request(app)
                .put('/api/admin/22')
        
                .send({
                    "name": `IRAKOZE ${makeId(5)}`,
                    "gender":"male"
                })
                .set('Cookie', `Authorized=${token}`,{httpOnly: true, maxAge:604800})
                .end((err,res) =>{ 
                    expect(res).to.have.status(200)
                    done()
        
                })
            })

            it('Deleting unexisting user by admin', (done)=>{
                chai 
                .request(app)
                .delete('/api/admin/25')
        
                
                .set('Cookie', `Authorized=${token}`,{httpOnly: true, maxAge:604800})
                .end((err,res) =>{ 
                    expect(res).to.have.status(404)
                    done()
        
                })
            })
    });

   



   

});
