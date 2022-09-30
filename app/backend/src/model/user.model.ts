import IUser from '../interfaces/IUser';
import userModelDB from '../database/models/UserModel';

export default class UserModel {
  private model = userModelDB;

  public async findOne(email: string): Promise<IUser> {
    const result = await this.model.findOne({ where: { email } });
    return result as IUser;
  }
}
