import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/matche.service';

export default class MatcheController {
  constructor(private matcheService: MatcheService) {}

  public findAll = async (req: Request, res: Response, next: NextFunction) => {
    const { inProgress } = req.query;
    try {
      const result = await this.matcheService.findAll(inProgress as string);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.matcheService.create(req.body);
      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  };

  public updateInProgressMatche = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.matcheService.updateInProgressMatche(+id);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  };

  public updateGols = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { awayTeamGoals, homeTeamGoals } = req.body;
    try {
      await this.matcheService.updateGols({ id: +id, awayTeamGoals, homeTeamGoals });
      res.status(200).send({ message: 'update gols' });
    } catch (error) {
      next(error);
    }
  };
}
