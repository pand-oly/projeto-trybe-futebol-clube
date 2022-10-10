import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import CustomError from '../error';

const schema = Joi.required();

export default function validateAuthorization(req: Request, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  try {
    const { error } = schema.validate(authorization);
    if (error) {
      throw new CustomError(404, 'authorization is undefined');
    }
    next();
  } catch (error) {
    console.log('validate authorization \n', error);
    next(error);
  }
}
