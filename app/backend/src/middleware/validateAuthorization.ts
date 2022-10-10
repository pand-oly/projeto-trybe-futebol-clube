import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import CustomError from '../error';
import jwtService from '../helpers/jwt.service';

const schema = Joi.required();

export default function validateAuthorization(req: Request, _res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  try {
    const { error, value } = schema.validate(authorization);
    if (error) {
      throw new CustomError(404, 'authorization is undefined');
    }
    jwtService.verifyToken(value);
    next();
  } catch (error) {
    console.log('validate authorization \n', error);
    next(error);
  }
}
