import { NextFunction, Request, Response } from 'express';
import CustomError from '../error';
import TeamModel from '../model/team.model';

const teamModel = new TeamModel();

export function notEgualTeams(req: Request, _res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  try {
    if (homeTeam === awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }
    next();
  } catch (error) {
    next(error);
  }
}

export async function validateTeams(req: Request, _res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  try {
    const validateHomeTeam = await teamModel.findOne(homeTeam);
    const validateAwayTeam = await teamModel.findOne(awayTeam);
    if (!validateAwayTeam || !validateHomeTeam) {
      throw new CustomError(404, 'There is no team with such id!');
    }
    next();
  } catch (error) {
    next(error);
  }
}
