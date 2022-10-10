import { NextFunction, Request, Response } from 'express';
import CustomError from '../error';

export default function validateTeamsMatche(req: Request, res: Response, next: NextFunction) {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    throw new CustomError(401, 'It is not possible to create a match with two equal teams');
  }
  next();
}
