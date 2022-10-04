import IUser from '../interfaces/IUser';
import userModelDB from '../database/models/UserModel';
import CustomError from '../error';

export default class UserModel {
  private model = userModelDB;

  public async findOne(email: string): Promise<IUser> {
    try {
      const result = await this.model.findOne({ where: { email } });
      return result as IUser;
    } catch (error) {
      throw new CustomError(400, 'non-existent user');
    }
  }
}
