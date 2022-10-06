import { compare } from 'bcryptjs';
import UserModel from '../model/user.model';
import IUser, { ILogin } from '../interfaces/IUser';
import jwtService from '../helpers/jwt.service';
import CustomError from '../error';
import validateToken from '../helpers/auth';

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

  public static async loginValidate(token: string | undefined): Promise<string> {
    const result = await validateToken(token);
    return result.role;
  }
}
