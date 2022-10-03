import { NextFunction, Request, Response } from 'express';
import Joi = require('joi');
import CustomError from '../error';
import { ILogin } from '../interfaces/IUser';

const schema = Joi.object<ILogin>({
  email: Joi.string().email().required().messages({
    'any.required': '400 / "email" is required',
  }),
  password: Joi.string().min(6).required(),
});

export default function loginValidate(req: Request, res: Response, next: NextFunction) {
  const { error } = schema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split(' / ');
    throw new CustomError(+code, message);
  }
  next();
}
