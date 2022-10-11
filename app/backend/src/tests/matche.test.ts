import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Matche from '../database/models/MatcheModel';
import { Response } from 'superagent';
import IMatche from '../interfaces/IMatche';
import validateAuthorization from '../middleware/validateAuthorization';
import jwtService from '../helpers/jwt.service';

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
      sinon.stub(jwtService, 'verifyToken').returns({});
      chaiHttpResponse = await chai.
      request(app)
      .post('/matches')
      .set('authorization', 'token')
      .send({
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
      sinon.stub(jwtService, 'verifyToken').returns({});
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'token')
        .send({
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
      sinon.stub(Matche, 'update').returns([1] as any);
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

      expect(chaiHttpResponse).to.have.status(200);
    });

    it('returns "{ message: "Finished" }"', async () => {
      sinon.stub(Matche, 'update').resolves([1] as any);
      chaiHttpResponse = await chai.request(app).patch('/matches/1/finish');

      expect(chaiHttpResponse.body).to.be.contain({ message: 'Finished' });
    });
  });

  describe('POST /matches not create case equal teams', () => {

    it('returns status code 401', async () => {
      sinon.stub(jwtService, 'verifyToken').returns({});
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'token')
        .send({
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 16,
          "awayTeamGoals": 1,
          "inProgress": false,
          "home_team": 16,
          "away_team": 8,
        });

      expect(chaiHttpResponse).to.have.status(401);
    });

    it('returns message It is not possible to create a match with two equal teams', async () => {
      sinon.stub(jwtService, 'verifyToken').returns({});
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'token')
        .send({
          "homeTeam": 16,
          "homeTeamGoals": 1,
          "awayTeam": 16,
          "awayTeamGoals": 1,
          "inProgress": false,
          "home_team": 16,
          "away_team": 8,
        });


      expect(chaiHttpResponse.body).to.be.deep
        .equal({ message: 'It is not possible to create a match with two equal teams' });
    });
  });

  describe('POST /matches not create if non-existent team', () => {

    it('returns status code 404 case non-existent homeTeam', async () => {
      sinon.stub(Matche, 'findOne').resolves(null as null);
      sinon.stub(jwtService, 'verifyToken').returns({});
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'token')
        .send({
          "homeTeam": 999,
          "homeTeamGoals": 1,
          "awayTeam": 8,
          "awayTeamGoals": 1,
          "inProgress": false,
          "home_team": 16,
          "away_team": 8,
        });

      expect(chaiHttpResponse).to.have.status(404);
    });

    it('returns status code 404 case non-existent awayTeam', async () => {
      sinon.stub(Matche, 'findOne').resolves(null as null);
      sinon.stub(jwtService, 'verifyToken').returns({});
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'token')
        .send({
          "homeTeam": 9,
          "homeTeamGoals": 1,
          "awayTeam": 999,
          "awayTeamGoals": 1,
          "inProgress": false,
          "home_team": 16,
          "away_team": 8,
        });

      expect(chaiHttpResponse).to.have.status(404);
    });

    it('returns message There is no team with such id!', async () => {
      sinon.stub(Matche, 'findOne').resolves(null as null);
      sinon.stub(jwtService, 'verifyToken').returns({});
      chaiHttpResponse = await chai
        .request(app)
        .post('/matches')
        .set('authorization', 'token')
        .send({
          "homeTeam": 999,
          "homeTeamGoals": 1,
          "awayTeam": 998,
          "awayTeamGoals": 1,
          "inProgress": false,
          "home_team": 16,
          "away_team": 8,
        });

      expect(chaiHttpResponse.body).to.be.deep
        .equal({ message: 'There is no team with such id!' });
    });
  });

  describe('PATCH /matches/:id update gols', () => {
    it('returns status code 200', async () => {
      sinon.stub(Matche, 'update');
      chaiHttpResponse = await chai.request(app).patch('/matches/1').send({
        homeTeamGoals: 3,
        awayTeamGoals: 1
      });

      expect(chaiHttpResponse).to.have.status(200);
    });
  });
});
