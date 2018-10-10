import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoxLCJlbWFpbCI6Im11aGZ1Y2tlckBnbWFpbC5jb20iLCJpYXQiOjE1Mzg2ODUyOTJ9.yK9bqyVonzdWJjvzYsMn8WyxlXJoieIbVT7QI7Spg6A';
let menuID;
let secondMenuId;
let firstOrder;

describe('Test to get all Menus', () => {
  describe('Test to create Menu', () => {
    it('should return 200 for a successfully creating a Menu', (done) => {
      const data = {
        name: 'Lorem Ipsum',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio delectus possimus totam. Ex, nobis quasi dolorum cupiditate possimus minus officia vel repudiandae, perspiciatis nihil itaque quas magni maxime placeat aliquam?',
        image: 'path',
        price: 3000,
        categoryId: 2,
        isAvailable: true,
      };
      chai
        .request(app)
        .post('/api/v1/menus')
        .send(data)
        .set('token', token)
        .end((err, res) => {
          menuID = res.body.result.id;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Menu was successfully Created');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should return 200 for updating a menu successfully', (done) => {
      const data = {
        name: 'Lorem Ipsum',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio delectus possimus totam. Ex, nobis quasi dolorum cupiditate possimus minus officia vel repudiandae, perspiciatis nihil itaque quas magni maxime placeat aliquam?',
        image: 'path',
        price: 3000,
        categoryId: 2,
        isAvailable: true,
      };
      chai
        .request(app)
        .put(`/api/v1/menus/${menuID}`)
        .send(data)
        .set('token', token)
        .end((err, res) => {
          // menuID = res.body.result.id;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Menu was updated successfully');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should return 400 for a if a params is not complete', (done) => {
      const data = {
        // name: 'Lorem Ipsum',
        description:
          'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio delectus possimus totam. Ex, nobis quasi dolorum cupiditate possimus minus officia vel repudiandae, perspiciatis nihil itaque quas magni maxime placeat aliquam?',
        image: 'path',
        price: 3000,
        categoryId: 2,
        isAvailable: true,
      };
      chai.request(app)
        .post('/api/v1/menus')
        .send(data)
        .set('token', token)
        .end((error, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });

    it('should return 200 for a successfully creating a Menu', (done) => {
      const data = {
        name: 'Lorem Ipsum',
        description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio delectus possimus totam. Ex, nobis quasi dolorum cupiditate possimus minus officia vel repudiandae, perspiciatis nihil itaque quas magni maxime placeat aliquam?',
        image: 'path',
        price: 3000,
        categoryId: 2,
        isAvailable: true,
      };
      chai
        .request(app)
        .post('/api/v1/menus')
        .send(data)
        .set('token', token)
        .end((err, res) => {
          secondMenuId = res.body.result.id;
          expect(res).to.have.status(200);
          expect(res.body.message).to.equal('Menu was successfully Created');
          expect(res.body).to.be.an('object');
          done();
        });
    });
    // it('should return 500 if it cannot create a Menu', (done) => {
    //   const data = {
    //     name: 'Lorem Ipsum',
    //     descrion:
    //         'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio delectus possimus totam. Ex, nobis quasi dolorum cupiditate possimus minus officia vel repudiandae, perspiciatis nihil itaque quas magni maxime placeat aliquam?',
    //     image: 'path',
    //     price: 3000,
    //     categoryId: 2,
    //     isAvailable: true,
    //   };
    //   chai
    //     .request(app)
    //     .post('/api/v1/menus')
    //     .send(data)
    //     .set('token', token)
    //     .end((err, res) => {
    //       expect(res).to.have.status(500);

    //       done();
    //     });
    // });
  });
  describe('Test to create an Order', () => {
    it('should return 200 for a successfully creating an Order', (done) => {
      const data = {
        menuid: secondMenuId,
        orderedby: 1,
        quantity: 2,
        totalprice: 1999,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(data)
        .set('token', token)
        .end((err, res) => {
          firstOrder = res.body.results.id;
          expect(res).to.have.status(201);
          expect(res.body.message).to.equal('Order was successfully made');
          expect(res.body).to.be.an('object');
          done();
        });
    });

    it('should return 400 for a if a params is not complete', (done) => {
      const data = {
      // menuid: secondMenuId,
        orderedby: 1,
        quantity: 2,
        totalprice: 1999.99,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(data)
        .set('token', token)
        .end((error, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
    it('should return 500 if cannot save data to the database', (done) => {
      const data = {
        menuid: secondMenuId,
        orderedby: 1,
        quantity: 2,
        totalpri: 1999.99,
      };
      chai.request(app)
        .post('/api/v1/orders')
        .send(data)
        .set('token', token)
        .end((error, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });

  describe('Test to Update an Order', () => {
    it('it should return 200 if successful', (done) => {
      const data = {
        menuid: secondMenuId,
        orderedby: 1,
        quantity: 2,
        totalprice: 1999.99,
        status: 'processing',
      };
      console.log(firstOrder);

      chai.request(app)
        .put(`/api/v1/orders/${firstOrder}`)
        .send(data)
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(200);
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('should return 500 if cannot update Order data to the database', (done) => {
      const data = {
        menuid: secondMenuId,
        orderedby: 1,
        quantity: 2,
        totalpri: 1999.99,
      };
      chai.request(app)
        .put(`/api/v1/orders/${firstOrder}`)
        .send(data)
        .set('token', token)
        .end((error, res) => {
          expect(res).to.have.status(500);
          done();
        });
    });
  });

  describe('Test for single order id', () => {
    it('should return an order', (done) => {
      chai.request(app)
        .get(`/api/v1/orders/${firstOrder}`)
        .set('token', token)
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'is an object containing an order details');
          done();
        });
    });
  });
  /* All Menus */
  describe('/GET api/v1/menus', () => {
    it('should return all Menus', (done) => {
      chai
        .request(app)
        .get('/api/v1/menus')
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'Menu is an object');
          done();
        });
    });
  });

  describe('Test for single menu id', () => {
    it('should return a menu', (done) => {
      chai
        .request(app)
        .get(`/api/v1/menus/${menuID}`)
        .end((error, res) => {
          expect(res).to.have.status(200);
          assert.isObject(res.body, 'is an object containing an order details');
          done();
        });
    });
  });

  /* valid character but not availiable */
  describe('Check for invalid menu Id', () => {
    it('should show a not found message', (done) => {
      chai
        .request(app)
        .get('/api/v1/menus/0')
        .end((error, res) => {
          expect(res).to.have.status(404);
          done(error);
        });
    });
  });

  // /* Should not parse any id with alphabetic characters */
  describe('Test for id with alphabet', () => {
    it('should not parseInt if Id has alphabet', (done) => {
      chai
        .request(app)
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
      chai
        .request(app)
        .delete(`/api/v1/menus/${menuID}`)
        .set('token', token)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should return 404 if parameter is not found', (done) => {
      chai
        .request(app)
        .delete('/api/v1/menus/0')
        .set('token', token)
        .end((error, response) => {
          expect(response).to.have.status(404);
          done();
        });
    });
  });
});
