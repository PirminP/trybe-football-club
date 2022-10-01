import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
}

Match.init({
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teams' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teams' });

export default Match;
