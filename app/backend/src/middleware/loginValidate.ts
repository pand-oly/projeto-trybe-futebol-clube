import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import CustomError from '../error';
import { ILogin } from '../interfaces/IUser';

const schema = Joi.object<ILogin>({
  email: Joi.string().email().required().messages({
    'any.required': '400 / "email" is required',
    'string.email': '400 / "email" must be a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': '401 / "password" is required',
    'string.min': '401 / "password" length must be at least 6 characters long',
  }),
});

export default function loginValidate(req: Request, _res: Response, next: NextFunction) {
  const { error } = schema.validate(req.body);
  if (error) {
    console.log('Login validate error:\n', error);
    const [code, message] = error.message.split(' / ');
    throw new CustomError(+code, message);
  }
  next();
}
