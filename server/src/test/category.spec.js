import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiZW1haWwiOiJvdHRpbW90aHlAZ21haWwuY29tICAgICAgICIsImlhdCI6MTU0NTU4NjYxOX0.mqRfhSNDkHQr5cR4ml19M1ve2zGPy7SifI-BtW8AYD0';

describe('Test to create category', () => {
  it('should return 201 for a successfully creating a category', (done) => {
    const data = {
      name: 'Confectionary',
    };
    chai
      .request(app)
      .post('/api/v1/category')
      .send(data)
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Category was successfully Created');
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return 200 for a listing all category', (done) => {
    chai
      .request(app)
      .get('/api/v1/category')
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return 200 for a listing a category', (done) => {
    chai
      .request(app)
      .get('/api/v1/category/1')
      .set('token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
