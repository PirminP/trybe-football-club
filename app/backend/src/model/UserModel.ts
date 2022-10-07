import UserModel from '../database/models/UserModel';
import IUser from '../interfaces/User';

class User {
  private _model = UserModel;

  async findOne(email: string): Promise<IUser | null> {
    const userData = await this._model.findOne({ where: { email } });
    return userData;
  }
}

export default User;
