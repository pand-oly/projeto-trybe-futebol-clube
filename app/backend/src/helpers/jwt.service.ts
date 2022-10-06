import * as Jwt from 'jsonwebtoken';
import CustomError from '../error';
import IJwtPayload from '../interfaces/IJwtPayload';

const { JWT_SECRET = 'secreto' } = process.env;

function generate(email: string) {
  const token = Jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
  return token;
}

function decode(token: string): IJwtPayload {
  try {
    const result = Jwt.decode(token);
    return result as IJwtPayload;
  } catch (error) {
    throw new CustomError(404, 'invalide token');
  }
}

export default { generate, decode };
