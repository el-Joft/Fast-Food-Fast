import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MSwiZW1haWwiOiJvdHRpbW90aHlAZ21haWwuY29tICAgICAgICIsImlhdCI6MTU0NTU4NjYxOX0.mqRfhSNDkHQr5cR4ml19M1ve2zGPy7SifI-BtW8AYD0';

const email = Math.random().toString(36).substring(2, 15);
const email2 = 'ottimothy@gmail.com';
chai.use(chaiHttp);

chai.should();

describe('Test users signup routes', () => {
  /* Allows a user to create an account */
  it('users should be able to create an account', (done) => {
    const data = {
      firstname: 'Timothy',
      lastname: 'Omotayo',
      phone: '07059972180',
      email: `${email}@gmail.com`,
      password: '12345',
      confirmPassword: '12345',
      address: 'Andela ',
      city: 'Lagos',
      zipcode: '101212',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(201);
        expect(res.body.message).to.equal('Your account was created successfully');
        done();
      });
  });

  // /* user can't sign up when he has already created an account */
  it('users should not be able to create an account twice', (done) => {
    const data = {
      firstname: 'Timothy',
      lastname: 'Omotayo',
      phone: '07059972180',
      email: 'ottimothy@gmail.com',
      password: '12345',
      confirmPassword: '12345',
      address: 'Andela ',
      city: 'Lagos',
      zipcode: '101212',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('Email Already Exist');
        done();
      });
  });

  it('users cannot create an account when credentials are not complete', (done) => {
    const data = {
      // firstName: 'Timothy',
      lastname: 'Omotayo',
      phone: '07059972180',
      email: `${email}@gmail.com`,
      password: '12345',
      confirmPassword: '12345',
      address: 'Andela ',
      city: 'Lagos',
      zipcode: '101212',
    };
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  // /* User signin */
  /* user can't sign up when he has already created an account */
  it('users should not be able to login in when wrong credentials are provided', (done) => {
    const data = {
      email: 'ottimothy.com',
      password: '01010101',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  /* user shouldn't be able to sign when credentials are empty */

  it('users should not be able to signin when credentials are incomplete', (done) => {
    const data = {
      email: '',
      password: '',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return error when the user does not exist', (done) => {
    const data = {
      email: 'ottim@gmail.com',
      password: '22222222',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return error when the user details are incorrect', (done) => {
    const data = {
      email: 'ottimothy@gmail.com',
      password: '22222222',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  // /* Allows a user to create an account */

  it('users should be able to login account to their account', (done) => {
    const data = {
      email: `${email}@gmail.com`,
      password: '12345',
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(data)
      .end((error, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('User login successfull');
        done();
      });
  });

  it('users should be able to a single user', (done) => {
    chai.request(app)
      .get('/api/v1/users/1')
      .set('token', token)
      .end((error, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('return error when user details is invalid', (done) => {
    chai.request(app)
      .get('/api/v1/users/1aa')
      .set('token', token)
      .end((error, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('return 404 when a user does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/users/1000')
      .set('token', token)
      .end((error, res) => {
        expect(res.body.message).to.equal('User with the Id not found');
        expect(res.body).to.have.status(404);
        
        done();
      });
  });
});
