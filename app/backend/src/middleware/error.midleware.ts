import { Request, Response, NextFunction } from 'express';
import CustomError from '../error';

export default (error: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const { name, message, code } = error;
  console.log(`name: ${name}`);

  return res.status(code).json({ message });
};
