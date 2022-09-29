import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string;
}

Users.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING(50),
  },
  role: {
    allowNull: false,
    type: STRING(50),
  },
  email: {
    allowNull: false,
    type: STRING(50),
  },
  password: {
    allowNull: false,
    type: STRING(50),
  },
}, {
  sequelize: db,
  modelName: 'users',
  timestamps: false,
});

export default Users;
