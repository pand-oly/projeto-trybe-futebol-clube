import { Router } from 'express';
import MatcheController from '../controllers/matche.controller';
import MatcheModel from '../model/matche.model';
import MatcheService from '../services/matche.service';
import { notEgualTeams, validateTeams } from '../middleware/matche.middleware';
import validateAuthorization from '../middleware/validateAuthorization';

const matcheRouter = Router();

const matcheModel = new MatcheModel();
const matcheService = new MatcheService(matcheModel);
const matcheController = new MatcheController(matcheService);

matcheRouter.route('/')
  .get(matcheController.findAll)
  .post(validateAuthorization, notEgualTeams, validateTeams, matcheController.create);

matcheRouter.route('/:id/finish').patch(matcheController.updateInProgress);

matcheRouter.route('/:id').patch(matcheController.updateGols);

export default matcheRouter;
