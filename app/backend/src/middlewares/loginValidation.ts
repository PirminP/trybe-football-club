import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { UserLog } from '../interfaces/UserLog';

const UserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const userLog: UserLog = req.body;

  const { error } = UserLogin.validate(userLog);
  if (error) {
    throw Error('All fields must be filled');
  }
  next();
};

export default loginValidation;
