export interface ICalcGames {
  goalsFavor: number;
  goalsOwn: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsBalance: number;
}

export default interface ITeamboard extends ICalcGames {
  name: string;
  efficiency: string;
  totalPoints: number;
}
