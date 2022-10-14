import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import ResultCalcTime from '../helpers/resultCalcTeam';
import ResultCalcTimeAway from '../helpers/resultCalcTeamAway';
import orderedTableResult from '../helpers/orderedTableResult';
import ResultAllCalcTeams from '../helpers/resultAllCalcTeams';
import ITeamMatch, { ITeamResult } from '../interfaces/TeamMatch';

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

  async getAllTeams() {
    const homeTeamMatch = await this.getAllHomeTeams();
    const awayTeamMatch = await this.getAllAwayTeams();

    const completeTable: ITeamResult[] = [];

    homeTeamMatch.forEach((homeTeam) => {
      awayTeamMatch.forEach((awayTeam) => {
        if (homeTeam.name === awayTeam.name) {
          const generateStandings = ResultAllCalcTeams
            .genetareCompleteTable(homeTeam, awayTeam);
          completeTable.push(generateStandings);
        }
      });
    });
    const orderedTable = orderedTableResult(completeTable);
    return orderedTable;
  }
}

export default LeaderboardService;
