import { Request, Response, NextFunction } from 'express';
import validation, { validateLogin } from '../helpers/joiValidation';
import { ILogin } from '../interfaces/User';

class inputValidation {
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
}

export default inputValidation;
