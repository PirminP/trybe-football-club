import { Request, Response, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';
import UserModel from '../database/models/UserModel';
import validation, { validateLogin } from '../helpers/joiValidation';
import { ILogin } from '../interfaces/User';

class InputValidation {
  constructor(private userModel: typeof UserModel) {}
  static async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email, password } = req.body as ILogin;
    const result = validation(validateLogin, { email, password });
    if (result.message) return res.status(400).json(result);
    next();
  }

  async tokenValidation(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;

    const tokenInvalid = { message: 'Invalid token' };
    try {
      const secretJWT = process.env.JWT_SECRET || 'suaSenhaSecreta';
      const { iat, ...decoded } = verify(token, secretJWT) as JwtPayload;

      const user = await this.userModel.findOne({
        where: { email: decoded.email, id: decoded.id },
        attributes: { exclude: ['password'] },
      });

      res.locals.user = user;
      next();
    } catch (error) {
      return res.status(401).json(tokenInvalid);
    }
  }
}

export default InputValidation;
