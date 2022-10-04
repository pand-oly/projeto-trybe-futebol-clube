import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../model/user.model'
import IUser from '../interfaces/IUser';
import { fail } from 'assert';
import jwtService from '../services/helpers/jwt.service';


chai.use(chaiHttp);
const { expect } = chai;

const userMock = new User();
const RETURN_USER_MOCK = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
}

describe('Test login routes', () => {
  let chaiHttpResponse: Response;

  describe('POST /login valid user', () => {

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
       email: 'user@user.com',
       password: 'secret_user',
     });
     sinon.stub(userMock, "findOne").resolves(RETURN_USER_MOCK as IUser);
    });

    after(() => sinon.restore());

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns a token', async () => {  
      expect(chaiHttpResponse.body).to.have.property('token');
    });
  });

  describe('POST /login invalid user', () => {

    before(async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
       email: 'user@user.com',
       password: 'invalid_password',
     });
     sinon.stub(userMock, "findOne").resolves(RETURN_USER_MOCK as IUser);
    });

    after(() => sinon.restore());

    it('returns status code 401', async () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('returns a message', async () => {  
      expect(chaiHttpResponse.body).to.have.contain({ message: 'Incorrect email or password' });
    });
  });

  describe('POST /login if not parameter email', () => {
    before(async () =>{
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'any_password',
      })
    });

    it('returns status code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('returns the message \"email\" is required', async () => {
      expect(chaiHttpResponse.body).to.have.contain({ message: 'All fields must be filled' });
    })
  });

  describe('POST /login case not email', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'email_invalid',
          password: 'password',
        });
    });

    it('returns status code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('returns the message \"email\" must be a valid email', async () => {
      expect(chaiHttpResponse.body).to.have.contain({ message: '\"email\" must be a valid email' })
    });
  });

  describe('POST /login if not parameter password', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'email@email.com',
        });
    });

    it('returns status code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('returns the message All fields must be filled', async () => {
      expect(chaiHttpResponse.body).to.be.contain({ message: 'All fields must be filled' });
    });
  });

  describe('POST /login case password is less that 6', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'email@email.com',
          password: '1234',
        });
    });

    it('returns status code 401', async () => {
      expect(chaiHttpResponse).to.have.status(401);
    })

    it('returns the message \"password\" length must be at least 6 characters long',
      async () => {
        expect(chaiHttpResponse.body).to.be
          .contain({ message: '"password" length must be at least 6 characters long' });
      });
  });

  describe('POST /login invalid email', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'invalid@email.com',
          password: 'password',
        });
      sinon.stub(userMock, 'findOne').throws();
    });

    after(() => sinon.restore());

    it('returns status 401', async () => {
      expect(chaiHttpResponse).to.have.status(401);
    });

    it('returns the message Incorrect email or password', async () => {
      expect(chaiHttpResponse.body).to.be.contain({ message: 'Incorrect email or password' });
    });
  });

  describe('GET /login/validate success valide token', () => {
    before(async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .send({
          authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        });
      sinon.stub(jwtService, 'decode')
        .returns({ email: 'user@user.com', iat: 1664881053, exp: 1664967453 });
    });

    after(() => sinon.restore());

    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns { role: "user" }', async () => {
      expect(chaiHttpResponse.body).to.be.contain({ role: 'user' });
    });
  });

  describe('GET /login/validate if authorization is undefined', () => {
    before(async () => {
      chaiHttpResponse = await chai.request(app).get('/login/validate');
    });

    it('returns status code 404', async () => {
      expect(chaiHttpResponse).to.have.status(404);
    });

    it('returns the message "authorization is undefined"', async () => {
      expect(chaiHttpResponse.body).to.be.contain({ message: 'authorization is undefined' });
    });
  });

  // describe('GET /login/validate invalide token', () => {
  //   before(async () => {
  //     chaiHttpResponse = await chai
  //       .request(app)
  //       .get('/login/validate')
  //       .send({ authorization: 'token' });
  //     // sinon.stub(jwtService, 'decode').throws(); //! if you use real token
  //   });

  //   it('returns status code 404', async () => {
  //     expect(chaiHttpResponse).to.have.status(404);
  //   });

  //   it('returns the message "invalide token"', async () => {
  //     expect(chaiHttpResponse.body).to.be.contain({ message: 'invalide token' });
  //   });
  // });
});
