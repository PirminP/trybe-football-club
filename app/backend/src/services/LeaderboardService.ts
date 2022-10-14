import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import ResultCalcTime from '../helpers/resultCalcTeam';
import ResultCalcTimeAway from '../helpers/resultCalcTeamAway';
import orderedTableResult from '../helpers/orderedTableResult';
import ITeamMatch from '../interfaces/TeamMatch';

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
    }) as unknown as ITeamMatch[];
    const matchInfo = teamList.map(ResultCalcTime.generateTable);
    const sortedTable = orderedTableResult(matchInfo);
    return sortedTable;
  }

  async getAllAwayTeams() {
    const teamList = await this.teamModel.findAll({
      include: {
        model: MatchModel,
        as: 'matchAway',
        where: {
          inProgress: false,
        },
      },
    }) as unknown as ITeamMatch[];
    const matchInfo = teamList.map(ResultCalcTimeAway.generateTable);
    const sortedTable = orderedTableResult(matchInfo);
    return sortedTable;
  }
}

export default LeaderboardService;
