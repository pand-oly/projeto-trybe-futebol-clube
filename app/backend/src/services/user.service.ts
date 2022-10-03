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

  public async login(params: ILogin): Promise<string> {
    const email = await this.userModel.findOne(params.email);

    if (await compare(params.password, email.password)) {
      const token = jwtService.generate(params);
      return token;
    }
    throw new CustomError(400, 'email or password invalid');
  }
}
