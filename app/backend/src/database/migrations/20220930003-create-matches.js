module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        allowNull: false,
        field: 'home_team',
        foreignKey: true,
        references: {
          model: 'teams',
          key: 'id',
        },
        type: Sequelize.INTEGER
      },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: Sequelize.INTEGER
      },
      awayTeam: {
        allowNull: false,
        field: 'away_team',
        foreignKey: true,
        references: {
          model: 'teams',
          key: 'id',
        },
        type: Sequelize.INTEGER
      },
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: Sequelize.INTEGER
      },
      inProgress: {
        allowNull: false,
        field: 'in_progress',
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};