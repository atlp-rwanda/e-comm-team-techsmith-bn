import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

const categoryId = 50;

describe('Category Controller', () => {
  // FETCH ALL CATEGORIES
  describe('Fetch all categories', () => {
    it('Should return all categories', (done) => {
      chai
        .request(app)
        .get('/api/category')
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          done();
        });
    });
  });

  // GET ALL PRODUCTS IN A CATEGORY
  describe('Get all products in a category', () => {
    it('Should return all products in a category', (done) => {
      chai
        .request(app)
        .get(`/api/category/${categoryId}`)
        .end((err, res) => {
          chai.expect(res).to.have.status(200);
          done();
        });
    });
  });
});
