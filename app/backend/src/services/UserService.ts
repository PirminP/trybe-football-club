import * as bcrypt from 'bcryptjs';
import tokenGenerator from '../helpers/tokenGenerator';
import UserModel from '../model/UserModel';
import { ILogin } from '../interfaces/User';
import IToken from '../interfaces/Token';

class UserService {
  constructor(private _model = new UserModel()) {}

  async login(userLogin: ILogin): Promise<IToken> {
    const userDate = await this._model.findOne(userLogin.email);
    if (userDate) {
      const match = await bcrypt.compare(userLogin.password, userDate.password);
      if (!match) {
        return { message: 'Incorrect email or password' };
      }
      const token = tokenGenerator(userDate.email, userDate.id);
      return { token };
    }
    return { message: 'Incorrect email or password' };
  }
}

export default UserService;
