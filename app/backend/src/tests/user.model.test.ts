import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../model/user.model'
import IUser from '../interfaces/IUser';

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
  })

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

    it('returns status code 400', async () => {
      expect(chaiHttpResponse).to.have.status(400);
    });

    it('returns a message', async () => {  
      expect(chaiHttpResponse.body).to.have.property('message');
    });
  })
})
