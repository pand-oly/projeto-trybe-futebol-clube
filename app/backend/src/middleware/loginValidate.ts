import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import CustomError from '../error';
import { ILogin } from '../interfaces/IUser';

const MSG_ERROR = '400 / All fields must be filled';

const schemaBody = Joi.object<ILogin>({
  email: Joi.string().email().required().messages({
    'any.required': MSG_ERROR,
    'string.email': '400 / "email" must be a valid email',
    'string.empty': MSG_ERROR,
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': MSG_ERROR,
    'string.min': '401 / "password" length must be at least 6 characters long',
    'string.empty': MSG_ERROR,
  }),
});

export default function checkLoginBody(req: Request, _res: Response, next: NextFunction) {
  const { error } = schemaBody.validate(req.body);
  if (error) {
    console.log('Login validate error:\n', error);
    const [code, message] = error.details[0].message.split(' / ');
    throw new CustomError(+code, message);
  }
  next();
}
