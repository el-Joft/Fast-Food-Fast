import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxLCJlbWFpbCI6Im11aGZ1Y2tlckBnbWFpbC5jb20iLCJpYXQiOjE1Mzg2ODUyOTJ9.yK9bqyVonzdWJjvzYsMn8WyxlXJoieIbVT7QI7Spg6A';

describe('Test to get all orders', () => {
  /* All orders made */
  describe('/GET api/v1/orders', () => {
    it('should return all orders made', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .set('token', token)
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'Orders is an object');
          done();
        });
    });
  });


  /* valid character but not availiable */
  describe('Check for invalid order Id', () => {
    it('should show a not found message', (done) => {
      chai.request(app)
        .get('/api/v1/orders/0')
        .set('token', token)
        .end((error, res) => {
          expect(res).to.have.status(404);
          done(error);
        });
    });
  });

  /* Should not parse any id with alphabetic characters */
  describe('Test for id with alphabet', () => {
    it('should retun an error message if Id has alphabet', (done) => {
      chai.request(app)
        .get('/api/v1/orders/123abcd')
        .set('token', token)
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Order Id is Invalid');
          done();
        });
    });
  });

  describe('Test to delete an Order', () => {
    it('should return 200 if an order was successfully deleted', (done) => {
      chai.request(app)
        .delete('/api/v1/orders/2')
        .set('token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return 404 if parameter is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/orders/0')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });
  });
});
