import ITeamMatch, { ITeamResult } from '../interfaces/TeamMatch';
import IMatch from '../interfaces/Match';

class ResultCalcTimeAway {
  static goalsCalculation(matchPlayed: IMatch[]) {
    const goalsFavor = matchPlayed
      .reduce((acc: number, cur: IMatch) => acc + cur.awayTeamGoals, 0);

    const goalsOwn = matchPlayed
      .reduce((acc: number, cur: IMatch) => acc + cur.homeTeamGoals, 0);

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static matchResult(matchPlayed: IMatch[]) {
    let totalVictories = 0;
    let totalLosses = 0;
    let totalDraws = 0;
    let totalPoints = 0;

    matchPlayed.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        totalVictories += 1;
        totalPoints += 3;
      } else if (match.awayTeamGoals < match.homeTeamGoals) {
        totalLosses += 1;
      } else {
        totalDraws += 1;
        totalPoints += 1;
      }
    });
    return { totalVictories, totalLosses, totalDraws, totalPoints };
  }

  static efficiency(totalPoints: number, totalGames: number) {
    return parseFloat(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  static generateTable(teamInfo: ITeamMatch) {
    const { teamName, matchAway: matchPlayed } = teamInfo;
    const result = ResultCalcTimeAway.matchResult(matchPlayed);
    const goals = ResultCalcTimeAway.goalsCalculation(matchPlayed);
    const efficiency = ResultCalcTimeAway.efficiency(result.totalPoints, matchPlayed.length);
    const info = {
      name: teamName,
      totalGames: matchPlayed.length,
      efficiency,
      ...goals,
      ...result,
    };
    return info as ITeamResult;
  }
}

export default ResultCalcTimeAway;
