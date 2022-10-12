export interface ICalcGames {
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
}

export interface ICalcGoals {
  goalsFavor: number;
  goalsOwn: number;
}

export default interface ITeamboard extends ICalcGames, ICalcGoals{
  name: string;
  goalsBalance: number;
  efficiency: string;
}
