import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/matche.service';

export default class MatcheController {
  constructor(private matcheService: MatcheService) {}

  public findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.matcheService.findAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
