import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/UserModel';
import { fail } from 'assert';
import jwtService from '../helpers/jwt.service';
import * as Jwt from 'jsonwebtoken';
import IJwtPayload from '../interfaces/IJwtPayload';


chai.use(chaiHttp);
const { expect } = chai;

const RETURN_USER_MOCK = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

describe('Test login routes', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => sinon.restore());

  describe('POST /login valid user', () => {

    it('returns status code 200', async () => {
      sinon.stub(User, "findOne").resolves(RETURN_USER_MOCK as User);
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'secret_user',
      });

     expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns a token', async () => {
      sinon.stub(User, "findOne").resolves(RETURN_USER_MOCK as User);
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'secret_user',
      });

      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('POST /login invalid user', () => {

    it('returns status code 401', async () => {
     sinon.stub(User, "findOne").resolves(RETURN_USER_MOCK as User);
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'invalid_password',
      });

     expect(chaiHttpResponse).to.have.status(401);
    });

    it('returns a message', async () => {
      sinon.stub(User, "findOne").resolves(RETURN_USER_MOCK as User);
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'user@user.com',
        password: 'invalid_password',
      });

      expect(chaiHttpResponse.body).to.have.contain({ message: 'Incorrect email or password' });
    });
  });

  describe('POST /login if not parameter email', () => {

    it('returns status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: 'any_password',
      });
      
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('returns the message \"email\" is required', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        password: 'any_password',
      });

      expect(chaiHttpResponse.body).to.have.contain({ message: 'All fields must be filled' });
    });
  });

  describe('POST /login case not email', () => {

    it('returns status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email_invalid',
        password: 'password',
      });

      expect(chaiHttpResponse).to.have.status(400);
    });

    it('returns the message \"email\" must be a valid email', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email_invalid',
        password: 'password',
      });

      expect(chaiHttpResponse.body).to.have
        .contain({ message: '\"email\" must be a valid email' });
    });
  });

  describe('POST /login if not parameter password', () => {

    it('returns status code 400', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email@email.com',
      });

      expect(chaiHttpResponse).to.have.status(400);
    });

    it('returns the message All fields must be filled', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email@email.com',
      });

      expect(chaiHttpResponse.body).to.be.contain({ message: 'All fields must be filled' });
    });
  });

  describe('POST /login case password is less that 6', () => {

    it('returns status code 401', async () => {
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'email@email.com',
        password: '1234',
      });

      expect(chaiHttpResponse).to.have.status(401);
    });

    it('returns the message \"password\" length must be at least 6 characters long',
      async () => {
        chaiHttpResponse = await chai.request(app).post('/login').send({
          email: 'email@email.com',
          password: '1234',
        });

        expect(chaiHttpResponse.body).to.be
          .contain({ message: '"password" length must be at least 6 characters long' });
      });
  });

  describe('POST /login invalid email', () => {

    it('returns status 401', async () => {
      sinon.stub(User, 'findOne').throws();
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'invalid@email.com',
        password: 'password',
      });

      expect(chaiHttpResponse).to.have.status(401);
    });

    it('returns the message Incorrect email or password', async () => {
      sinon.stub(User, 'findOne').throws();
      chaiHttpResponse = await chai.request(app).post('/login').send({
        email: 'invalid@email.com',
        password: 'password',
      });

      expect(chaiHttpResponse.body).to.be.contain({ message: 'Incorrect email or password' });
    });
  });

  describe('GET /login/validate success valide token', () => {
    
    it('returns status code 200', async () => {
      sinon.stub(jwtService, 'decode').returns({ email: 'user@user.com' } as IJwtPayload);
      sinon.stub(User, 'findOne').returns(RETURN_USER_MOCK as any);
      chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'token');

      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns { role: "user" }', async () => {
      sinon.stub(jwtService, 'decode').returns({ email: 'user@user.com' } as IJwtPayload);
      sinon.stub(User, 'findOne').returns(RETURN_USER_MOCK as any);
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'token');

      expect(chaiHttpResponse.body).to.be.contain({ role: 'user' });
    });
  });

  describe('GET /login/validate if authorization is undefined', () => {

    it('returns status code 404', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate');
  
      expect(chaiHttpResponse).to.have.status(404);
    });

    it('returns the message "authorization is undefined"', async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate');

      expect(chaiHttpResponse.body).to.be.contain({ message: 'authorization is undefined' });
    });
  });

  describe('GET /login/validate invalide token', () => {

    it('returns status code 404', async () => {
      sinon.stub(jwtService, 'decode').throws();
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'token');

      expect(chaiHttpResponse).to.have.status(404);
    });

    it('returns the message "invalide token"', async () => {
      sinon.stub(jwtService, 'decode').throws();
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('authorization', 'token');

      expect(chaiHttpResponse.body).to.be.contain({ message: 'invalide token' });
    });
  });
});
