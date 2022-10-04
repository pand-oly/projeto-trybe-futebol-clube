import { Router } from 'express';
import TeamController from '../controllers/team.controller';
import TeamModel from '../model/team.model';
import TeamService from '../services/team.service';

const teamsRouter = Router();

const teamModel = new TeamModel();
const teamService = new TeamService(teamModel);
const teamController = new TeamController(teamService);

teamsRouter.get('/', teamController.findAll);
teamsRouter.get('/:id', teamController.findByPk);

export default teamsRouter;
