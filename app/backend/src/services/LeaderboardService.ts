import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import ResultCalcTime from '../helpers/resultCalcTeam';
import orderedTableResult from '../helpers/orderedTableResult';

class LeaderboardService {
  constructor(
    private teamModel: typeof TeamModel,
  ) {}

  async getAllHomeTeams() {
    const teamList = await this.teamModel.findAll({
      include: {
        model: MatchModel,
        as: 'matchHome',
        where: {
          inProgress: false,
        },
      },
    });
    const matchInfo = teamList.map(ResultCalcTime.generateTable);
    const sortedTable = orderedTableResult(matchInfo);
    return sortedTable;
  }
}

export default LeaderboardService;
