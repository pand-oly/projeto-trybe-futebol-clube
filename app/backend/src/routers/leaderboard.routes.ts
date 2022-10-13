import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import MatcheModel from '../model/matche.model';
import TeamModel from '../model/team.model';
import LeaderboardService from '../services/leaderboard.service';

const leaderboardRouter = Router();

const matcheModel = new MatcheModel();
const teamModel = new TeamModel();
const leaderboardService = new LeaderboardService(matcheModel, teamModel);
const leaderboardController = new LeaderboardController(leaderboardService);

leaderboardRouter.get('/home', leaderboardController.findHome);
leaderboardRouter.get('/away', leaderboardController.findAway);

export default leaderboardRouter;
