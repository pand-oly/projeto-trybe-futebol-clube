import { NextFunction, Request, Response } from 'express';
import MatcheService from '../services/matche.service';
import auth from '../helpers/auth';
import CustomError from '../error';

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

  public create = async (req: Request, res: Response, _next: NextFunction) => {
    const { authorization } = req.headers;
    try {
      auth(authorization);
      const result = await this.matcheService.create(req.body);
      return res.status(200).send(result);
    } catch {
      throw new CustomError(404, 'authorization is undefined');
    }
  };
}
