import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService: TeamService) {}

  public findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.teamService.findAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public findByPk = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const result = await this.teamService.findByPk(+id);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
