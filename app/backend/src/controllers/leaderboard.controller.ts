import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  public findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.leaderboardService.findAll();
      return res.send(result);
    } catch (error) {
      next(error);
    }
  };
}
