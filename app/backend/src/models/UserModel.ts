import User from '../database/models/UserModel';
// import { UserAdmin } from '../interfaces/UserAdmin';

class UserModel {
  private _user = User;
  async findOne(email:string): Promise<User | null> {
    const getEmail = await this._user.findOne({ where: { email } });
    return getEmail;
  }
}

export default UserModel;
