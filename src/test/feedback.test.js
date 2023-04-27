import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';
import makeid from '../utils/random.js';


chai.should();
chai.use(chaiHttp);
const { expect } = chai;


const notOrdered = {
   
    rating:4,
    feedback:`${makeid(10)}`
}

const orderedNotPaid = {
    rating:4,
    feedback:`${makeid(10)}`
}

const orderedPaid = {
    
    rating:4,
    feedback:`${makeid(10)}`
}


const loginUser = {
  email: "ikevine@gmail.com",
  password: "Kevine@123"
};



let cookie=""

// BUYER CAN CRUD ORDERS
describe("Sending ratings and feedback by buyer",()=>{
  it("Buyer should be able to give feedback and ratings on the product",(done)=>{
    chai.request(app)
    .post('/api/users/login')
    .send(loginUser)
    .end((err,res)=>{
      expect(res).to.have.status(200)
      cookie = res.header['set-cookie'][0];
      chai.request(app)
      .post('/api/feedback/4')
      .send(orderedPaid)
      .set('cookie',cookie)
      .end((err,res)=>{
        expect(res).to.have.status(201)
        done()
      })
    })
  })

  it("Buyer should provide available product in the order list",(done)=>{
    chai.request(app)
    .post('/api/feedback/119')
    .send(notOrdered)
    .set('cookie',cookie)
    .end((err,res)=>{
      expect(res).to.have.status(404)
      done()
    })
  })
  
  it("Buyer should provide available product in the payment list",(done)=>{
    chai.request(app)
    .post("/api/feedback/2")
    .send(orderedNotPaid)
    .set('cookie',cookie)
    .end((err,res)=>{
      expect(res).to.have.status(404)
      done()
    })
  })

  it("Buyer should provide available product in the product list to view feedbacks ",(done)=>{
    chai.request(app)
    .get(`/api/feedback/12345`)
    .set('cookie',cookie)
    .end((err,res)=>{
      expect(res).to.have.status(404)
      done()
    })
  })
  
  it("Buyer should provide available product in the payment list to view feedbacks",(done)=>{
    chai.request(app)
    .get(`/api/feedback/12345`)
    .set('cookie',cookie)
    .end((err,res)=>{
      expect(res).to.have.status(404)
      done()
    })
  })

})


  

    
 

 



