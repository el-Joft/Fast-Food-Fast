import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);

describe('Test to get all orders', () => {
  /* All orders made */
  describe('/GET api/v1/orders', () => {
    it('should return all orders made', (done) => {
      chai.request(app)
        .get('/api/v1/orders')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'Orders is an object');
          done();
        });
    });
  });
  describe('Test to create an Order', () => {
    it('should return 200 for a successfully creating an Order', (done) => {
      const data = {
        menuId: 1,
        orderedBy: 1,
        quantity: 2,
        totalPrice: 1999.99,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Order was successfully made');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('Test to Update an Order', () => {
    it('it should return 200 if successful', (done) => {
      const data = {
        menuId: 1,
        orderedBy: 1,
        quantity: 2,
        totalPrice: 1999.99,
      };
      chai.request(app)
        .put('/api/v1/orders/1')
        .send(data)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
  });

  describe('Test for single order id', () => {
    it('should return an order', (done) => {
      chai.request(app)
        .get('/api/v1/orders/1')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(parseInt(res.body.result.id, 10)).to.equal(23);

          expect(res.body.result.id).to.be.a('number');
          assert.isObject(res.body, 'is an object containing an order details');
          done();
        });
    });
  });

  /* valid character but not availiable */
  describe('Check for invalid order Id', () => {
    it('should show a not found message', (done) => {
      chai.request(app)
        .get('/api/v1/orders/10000')
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
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Order Id is Invalid');
          done();
        });
    });
  });

//   // describe('Test to delete an Order', () => {
//   //   it('should return 200 if an order was successfully deleted', (done) => {
//   //     chai.request(app)
//   //       .delete('/api/v1/orders/32')
//   //       .end((err, res) => {
//   //         expect(res).to.have.status(200);
//   //         done();
//   //       });
//   //   });
//   //   it('should return 404 if parameter is not found', (done) => {
//   //     chai.request(app)
//   //       .delete('/api/v1/orders/50000')
//   //       .end((error, response) => {
//   //         expect(response).to.have.status(404);
//   //         done();
//   //       });
//   //   });
// });
});
