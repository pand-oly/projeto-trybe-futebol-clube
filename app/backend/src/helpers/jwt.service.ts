import * as Jwt from 'jsonwebtoken';
import 'dotenv/config';
import CustomError from '../error';

const { JWT_SECRET = 'secreto' } = process.env;

function generate(email: string) {
  const token = Jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' });
  return token;
}

function verifyToken(token: string): Jwt.JwtPayload {
  try {
    const result = Jwt.verify(token, JWT_SECRET) as Jwt.JwtPayload;
    return result;
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }
}

export default { generate, verifyToken };
