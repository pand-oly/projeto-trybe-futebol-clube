import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  constructor(private userController: UserService) {}

  public async findOne(req: Request, res: Response) {
    const { email } = req.body;
    const result = await this.userController.findOne(email);
    return res.send(result);
  }
}
