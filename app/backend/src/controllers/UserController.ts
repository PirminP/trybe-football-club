import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { UserLog } from '../interfaces/UserLog';

class UserController {
  constructor(private Uservice: UserService = new UserService()) {}

  async UserLogin(req: Request, res: Response) {
    const userLog: UserLog = req.body;
    const login = await this.Uservice.UserLogin(userLog);
    return res.status(200).json({ token: login });
  }
}

export default UserController;
