import { ITeamResult } from '../interfaces/TeamMatch';

class ResultAllCalcTeams {
  static genetareCompleteTable(Home: ITeamResult, Away: ITeamResult) {
    const totalPoints = Home.totalPoints + Away.totalPoints;
    const totalGames = Home.totalGames + Away.totalGames;
    const efficiency = parseFloat(((totalPoints / (totalGames * 3)) * 100)
      .toFixed(2));
    const completeTable = {
      name: Home.name,
      totalGames,
      goalsFavor: Home.goalsFavor + Away.goalsFavor,
      goalsOwn: Home.goalsOwn + Away.goalsOwn,
      goalsBalance: Home.goalsBalance + Away.goalsBalance,
      totalVictories: Home.totalVictories + Away.totalVictories,
      totalLosses: Home.totalLosses + Away.totalLosses,
      totalDraws: Home.totalDraws + Away.totalDraws,
      totalPoints,
      efficiency,
    };
    return completeTable;
  }
}

export default ResultAllCalcTeams;
