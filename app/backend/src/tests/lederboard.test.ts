import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matche from '../database/models/MatcheModel';
import LeaderboardService from '../services/leaderboard.service';



chai.use(chaiHttp);
const { expect } = chai;

describe.skip('Test - routes', () => {
  let chaiHttpResponse: Response;

  beforeEach(() => sinon.restore());

  describe('1', () => {
    // it('', async () => {
    //   const cb = sinon.stub(Matche, "findAll")
    //   cb.onCall(1).resolves(RETURN_USER_MOCK as User);
    //   sinon.stub(LeaderboardService, '') //! static
    //   chaiHttpResponse = await chai.request(app).get('/leaderboard');
    // })   //TODO: use static method to be able to mock like sequelize model
  })
});
