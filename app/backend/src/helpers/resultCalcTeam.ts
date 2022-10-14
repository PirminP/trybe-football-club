import ITeamMatch, { ITeamResult } from '../interfaces/TeamMatch';
import IMatch from '../interfaces/Match';

class ResultCalcTime {
  static goalsCalculation(matchPlayed: IMatch[]) {
    const goalsFavor = matchPlayed
      .reduce((acc: number, cur: IMatch) => acc + cur.homeTeamGoals, 0);

    const goalsOwn = matchPlayed
      .reduce((acc: number, cur: IMatch) => acc + cur.awayTeamGoals, 0);

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, goalsBalance };
  }

  static matchResult(matchPlayed: IMatch[]) {
    let totalVictories = 0;
    let totalLosses = 0;
    let totalDraws = 0;
    let totalPoints = 0;

    matchPlayed.forEach((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        totalVictories += 1;
        totalPoints += 3;
      } else if (match.homeTeamGoals < match.awayTeamGoals) {
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

  static generateTable(teamInfo: any) {
    const { teamName, matchHome: matchPlayed } = teamInfo as ITeamMatch;
    const result = ResultCalcTime.matchResult(matchPlayed);
    const goals = ResultCalcTime.goalsCalculation(matchPlayed);
    const efficiency = ResultCalcTime.efficiency(result.totalPoints, matchPlayed.length);
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

export default ResultCalcTime;
