import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import makeid from '../utils/random.js';
import jwt from 'jsonwebtoken';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;

const user = {
  name: 'Test',
  email: `${makeid(5)}@gmail.com`,
  role: 1,
  id: makeid(5),
  password: 'Password@123',
  gender: 'M',
};

const loginUser = {
  email: user.email,
  password: user.password,
};

const orderUser={
  email:'ikevine@gmail.com',
  password:'Kevine@123'
}
const order1= {
  productId:568,
  userId:394, 
  desiredQuantity:1,
  amount:900
 }
const unvailableProduct={
  productId:23456778,
  userId:394, 
  desiredQuantity:23,
  amount:5000
}


const update={
  quantity:2,
}

let cookie=""
// ADMIN CAN GET ALL ORDERS
describe('Admin user', () => {
  it('can get all orders ', (done) => {
    chai
      .request(app)
      .post('/api/users/signup')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        chai
          .request(app)
          .post('/api/users/login')
          .send(loginUser)
          .end((err, res) => {
            expect(res).to.have.status(200);
            const token = jwt.sign(
              { id: user.id, role: user.role },
              process.env.USER_SECRET,
              {
                expiresIn: 604800,
              }
            );
            chai
              .request(app)
              .get('/api/orders')
              .set('cookie', `Authorized=${token}`, {
                httpOnly: true,
                maxAge: 604800,
              })
              .end((err, res) => {
                expect(res).to.have.status(200);
                done();
              });
          });
      });
  });
});

// BUYER CAN CRUD ORDERS
describe("CRUD order by buyer",()=>{
  it("Buyer should be able to create an order",(done)=>{
    chai.request(app)
    .post('/api/users/login')
    .send(orderUser)
    .end((err,res)=>{
      expect(res).to.have.status(200)
      cookie = res.header['set-cookie'][0];
      chai.request(app)
      .post('/api/orders')
      .send(order1)
      .set('cookie',cookie)
      .end((err,res)=>{
        expect(res).to.have.status(201)
        done()
      })
    })
  })

  it("Buyer should provide available product",(done)=>{
    chai.request(app)
    .post('/api/orders')
    .send(unvailableProduct)
    .set('cookie',cookie)
    .end((err,res)=>{
      expect(res).to.have.status(404)
      done()
    })
  })
  

  it("Should be able to update order",(done)=>{
    chai.request(app)
    .put("/api/orders/267")
    .send(update)
    .set('cookie',cookie)
    .end((err,res)=>{
      expect(res).to.have.status(200)
      done()
    })
  })

  it("should be able to delete order",(done)=>{
    chai.request(app)
    .delete('/api/orders/999')
    .set('cookie',cookie)
    .end((err,res)=>{
      expect(res).to.have.status(404)
      done()
    })
  })

})

