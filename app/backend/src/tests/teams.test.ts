import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Team from '../database/models/TeamModel';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const TEAM_MOCK = { id: 1, teamName: 'Bahia' };
const ARRAY_TEAMS_MOCK = [TEAM_MOCK];

describe('Test teams routes', () => {
  let chaiHttpResponse: Response;

  describe('GET /teams findAll teams', () => {
    before(async () => {
      sinon
      .stub(Team, 'findAll')
      .resolves(ARRAY_TEAMS_MOCK as Team[]);
      chaiHttpResponse = await chai.request(app).get('/teams');
    });
    
    after(() => sinon.restore());
    
    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns array object', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(ARRAY_TEAMS_MOCK);
    });
  });

  describe('GET /teams/:id findOne team', () => {
    before(async () => {
      sinon
      .stub(Team, 'findOne')
      .resolves(TEAM_MOCK as Team);
      chaiHttpResponse = await chai.request(app).get('/teams/1');
    });
    
    after(() => sinon.restore());
    
    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns one object Team', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(TEAM_MOCK);
    });
  });
});
