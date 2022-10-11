import ITeam from './ITeam';

export default interface IMatche {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}

export interface IUpdateGols {
  id: number;
  awayTeamGoals: number;
  homeTeamGoals: number;
}
