export default interface IMatche {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IUpdateGols {
  id: number;
  awayTeamGoals: number;
  homeTeamGoals: number;
}
