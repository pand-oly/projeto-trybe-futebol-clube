import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matche from '../database/models/MatcheModel';
import { Response } from 'superagent';
import IMatche from '../interfaces/IMatche';

chai.use(chaiHttp);

const { expect } = chai;

const MATCHE_MOCK = {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 1,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "home_team": 16,
  "away_team": 8,
};
const ARRAY_MATCHE_MOCK = [MATCHE_MOCK];

describe('Test matches routes', () => {
  let chaiHttpResponse: Response;

  describe('GET /matches findAll matches', () => {
    before(async () => {
      sinon.stub(Matche, 'findAll').resolves(ARRAY_MATCHE_MOCK as any); //!
      chaiHttpResponse = await chai.request(app).get('/matches');
    });
    
    after(() => sinon.restore());
    
    it('returns status code 200', async () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns array object', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(ARRAY_MATCHE_MOCK);
    });
  });
});
