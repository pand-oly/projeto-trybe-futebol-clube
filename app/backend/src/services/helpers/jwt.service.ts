import * as Jwt from 'jsonwebtoken';
import { ILogin } from '../../interfaces/IUser';

const { JWT_SECRET = 'secreto' } = process.env;

function generate({ email, password }: ILogin) {
  const token = Jwt.sign({ email, password }, JWT_SECRET, { expiresIn: '1d' });
  return token;
}

export default { generate };
