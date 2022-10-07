import { Router } from 'express';
import MatcheController from '../controllers/matche.controller';
import MatcheModel from '../model/matche.model';
import MatcheService from '../services/matche.service';

const matcheRouter = Router();

const matcheModel = new MatcheModel();
const matcheService = new MatcheService(matcheModel);
const matcheController = new MatcheController(matcheService);

matcheRouter.get('/', matcheController.findAll);
matcheRouter.post('/', matcheController.create);
matcheRouter.patch('/:id/finish', matcheController.updateInProgressMatche);

export default matcheRouter;
