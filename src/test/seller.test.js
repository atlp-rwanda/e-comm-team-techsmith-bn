import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server.js';

const sellerId = 115;

describe('Get all sellers and a single seller', () => {
    it('should return 200', (done) => {
        chai.request(app)
        .get('/api/sellers')
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            done()
        })
    })

    it('Should a single seller info', (done) => {
        chai.request(app)
        .get(`/api/sellers/${sellerId}`)
        .end((err, res) => {
            chai.expect(res).to.have.status(200);
            done()
        })
    })
})