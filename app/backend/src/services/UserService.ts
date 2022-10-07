import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import { UserLog } from '../interfaces/UserLog';

class UserService {
  constructor(private Umodel: UserModel = new UserModel()) {}

  async UserLogin(user: UserLog) {
    const userValidation = await this.Umodel.findOne(user.email);
    if (!userValidation) {
      throw Error('Incorrect email or password');
    }
    const validPassword = compareSync(user.password, userValidation.password);
    if (!validPassword) {
      throw Error('Incorrect email or password');
    }
    const token = sign(
      { data: user },
      process.env.JWT_SECRET as string,

      { algorithm: 'HS256', expiresIn: '3d' },
    );
    return token;
  }
}

export default UserService;
