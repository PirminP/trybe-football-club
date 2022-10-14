interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

interface IScore {
  homeTeamGoals: number,
  awayTeamGoals: number
}

export { IScore };

export default IMatch;
