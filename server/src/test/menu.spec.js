import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);

describe('Test to get all Menus', () => {
  /* All Menus */
  describe('/GET api/v1/menus', () => {
    it('should return all Menus', (done) => {
      chai.request(app)
        .get('/api/v1/menus')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'Menu is an object');
          done();
        });
    });
  });
  describe('Test to create Menu', () => {
    it('should return 200 for a successfully creating a Menu', (done) => {
      const data = {
        name: 'Lorem Ipsum',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio delectus possimus totam. Ex, nobis quasi dolorum cupiditate possimus minus officia vel repudiandae, perspiciatis nihil itaque quas magni maxime placeat aliquam?',
        image: 'path',
        price: 3000,
        categoryId: 2,
        isAvailable: true,
      };
      chai.request(app)
        .post('/api/v1/menus')
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Menu was successfully Created');
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
  describe('Test to Update a Menu', () => {
    it('it should return 200 if successful', (done) => {
      const data = {
        name: 'Lorem Ipsum',
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio delectus possimus totam. Ex, nobis quasi dolorum cupiditate possimus minus officia vel repudiandae, perspiciatis nihil itaque quas magni maxime placeat aliquam?',
        image: 'path',
        price: 3000,
        categoryId: 2,
        isAvailable: true,
      };
      chai.request(app)
        .put('/api/v1/menus/6')
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
        .get('/api/v1/menus/1')
        .end((error, res) => {
          expect(res).to.have.status(200);
          expect(parseInt(res.body.menu.id, 10)).to.equal(1);

          expect(res.body.menu.id).to.be.a('number');
          assert.isObject(res.body, 'is an object containing an order details');
          done();
        });
    });
  });

  /* valid character but not availiable */
  describe('Check for invalid order Id', () => {
    it('should show a not found message', (done) => {
      chai.request(app)
        .get('/api/v1/menus/1000000')
        .end((error, res) => {
          expect(res).to.have.status(404);
          done(error);
        });
    });
  });

  // /* Should not parse any id with alphabetic characters */
  describe('Test for id with alphabet', () => {
    it('should not parseInt if Id has alphabet', (done) => {
      chai.request(app)
        .get('/api/v1/menus/123abcd')
        .end((message, res) => {
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal('Menu Id is Invalid');
          done();
        });
    });
  });
  describe('Test to delete a Menu', () => {
    it('should return 200 if an order was successfully deleted', (done) => {
      chai.request(app)
        .delete('/api/v1/menus/1')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return 404 if parameter is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/menus/50')
        .end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });
  });
});
