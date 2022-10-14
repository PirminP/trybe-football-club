import MatchModel from '../database/models/MatchModel';

interface ITeamMatch {
  id?: number,
  teamName: string,
  matchHome: MatchModel[],
}

interface ITeamResult {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export { ITeamResult };
export default ITeamMatch;
