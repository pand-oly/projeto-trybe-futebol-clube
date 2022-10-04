import { compare } from 'bcryptjs';
import UserModel from '../model/user.model';
import IUser, { ILogin } from '../interfaces/IUser';
import jwtService from './helpers/jwt.service';
import CustomError from '../error';

export default class UserService {
  constructor(private userModel: UserModel) {}

  public async findOne(email: string): Promise<IUser> {
    return this.userModel.findOne(email);
  }

  public async login(login: ILogin): Promise<string> {
    try {
      const user = await this.userModel.findOne(login.email);

      if (!await compare(login.password, user.password)) {
        throw new CustomError(401, 'Incorrect email or password');
      }

      const token = jwtService.generate(login.email);
      return token;
    } catch (error) {
      throw new CustomError(401, 'Incorrect email or password');
    }
  }

  public async loginValidate(token: string): Promise<string> {
    try {
      const payload = jwtService.decode(token);
      const result = await this.userModel.findOne(payload.email);
      return result.role;
    } catch (error) {
      throw new CustomError(400, 'non-existent user');
    }
  }
}
