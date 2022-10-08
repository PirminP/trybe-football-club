import 'dotenv/config';
import { sign, SignOptions } from 'jsonwebtoken';

function tokenGenerator(email: string, id: number) {
  const secret = process.env.JWT_SECRET || 'suaSenhaSecreta';
  const jwtConfig: SignOptions = { algorithm: 'HS256' };
  const token = sign(
    { email, id },
    secret,
    jwtConfig,
  );

  return token;
}

export default tokenGenerator;
