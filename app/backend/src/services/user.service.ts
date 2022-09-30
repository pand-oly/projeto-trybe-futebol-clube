import UserModel from '../model/user.model';
import IUser from '../interfaces/IUser';

export default class UserService {
  constructor(private userModel: UserModel) {}

  public async findOne(email: string): Promise<IUser> {
    return this.userModel.findOne(email);
  }
}
