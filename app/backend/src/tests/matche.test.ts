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
}
const ARRAY_MATCHE_MOCK = [MATCHE_MOCK];

describe('Test matches routes', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => sinon.restore());

  describe('GET /matches findAll matches', () => {
    
    it('returns status code 200', async () => {
      sinon.stub(Matche, 'findAll').resolves(ARRAY_MATCHE_MOCK as any);
      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns array object', async () => {
      sinon.stub(Matche, 'findAll').resolves(ARRAY_MATCHE_MOCK as any);
      chaiHttpResponse = await chai.request(app).get('/matches');

      expect(chaiHttpResponse.body).to.be.deep.equal(ARRAY_MATCHE_MOCK);
    });
  });

  describe('POST /matches create new matche', () => {

    it('returns status code 201', async () => {
      sinon.stub(Matche, 'create').resolves(MATCHE_MOCK as any);
      chaiHttpResponse = await chai.request(app).post('/matches').send({
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "home_team": 16,
        "away_team": 8,
      });

      expect(chaiHttpResponse).to.have.status(201);
    });

    it('returns obj with new matche', async () => {
      sinon.stub(Matche, 'create').resolves(MATCHE_MOCK as any);
      chaiHttpResponse = await chai.request(app).post('/matches').send({
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "home_team": 16,
        "away_team": 8,
      });

      expect(chaiHttpResponse.body).to.be.deep.equal(MATCHE_MOCK);
    });
  });

  describe('PATCH /matches/:id/finish', () => {
    it('returns status code 200', async () => {
      sinon.stub(Matche, 'update').resolves(MATCHE_MOCK as any);
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns "{ message: "Finished" }"', async () => {
      sinon.stub(Matche, 'update').resolves(MATCHE_MOCK as any);
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

      expect(chaiHttpResponse.body).to.be.contain({ message: 'Finished' });
    });
  });
});
