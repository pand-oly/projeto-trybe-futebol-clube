import UserModel from '../model/user.model';
import jwtService from './jwt.service';
import CustomError from '../error';
import IUser from '../interfaces/IUser';

const userModel = new UserModel();

export default async function validateToken(token: string | undefined): Promise<IUser> {
  if (!token) {
    throw new CustomError(404, 'authorization is undefined');
  }
  const payload = jwtService.decode(token);
  const user = await userModel.findOne(payload.email);
  return user;
}
