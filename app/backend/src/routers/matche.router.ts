import { Router } from 'express';
import MatcheController from '../controllers/matche.controller';
import MatcheModel from '../model/matche.model';
import MatcheService from '../services/matche.service';
import { notEgualTeams } from '../middleware/matche.middleware';

const matcheRouter = Router();

const matcheModel = new MatcheModel();
const matcheService = new MatcheService(matcheModel);
const matcheController = new MatcheController(matcheService);

matcheRouter.get('/', matcheController.findAll);
matcheRouter.post('/', notEgualTeams, matcheController.create);
matcheRouter.patch('/:id/finish', matcheController.updateInProgressMatche);

export default matcheRouter;
