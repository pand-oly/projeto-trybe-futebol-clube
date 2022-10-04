import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userService: UserService) {}

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.userService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  public async loginValidate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    try {
      const role = await this.userService.loginValidate(authorization);
      return res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
