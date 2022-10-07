import { Request, Response } from 'express';
import { ILogin } from '../interfaces/User';
import UserService from '../services/UserService';

class UserController {
  constructor(private _service = new UserService()) {}
  async login(req: Request<unknown, unknown, ILogin>, res: Response) {
    const { email, password } = req.body;
    const { token, message } = await this._service.login({ email, password });
    if (message) {
      res.status(401).json({ message });
    } else {
      res.status(200).json({ token });
    }
  }
}

export default UserController;
