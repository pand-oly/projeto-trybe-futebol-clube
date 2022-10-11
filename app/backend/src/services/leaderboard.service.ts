import MatcheModel from '../model/matche.model';
import TeamModel from '../model/team.model';
// import ITeamboard from '../interfaces/ITeamboard';
// import IMatche from '../interfaces/IMatche';

export default class LeaderboardService {
  constructor(private matcheModel: MatcheModel, private teamModel = new TeamModel()) {}

  // public findAll = async (): Promise<ITeamboard[]> => {
  //   const matches = await this.matcheModel.findAll();

  //   const obj = matches.map((m: IMatche) => ({
  //     name: m.teamHome.teamName,
  //     totalPoints: 0,
  //     totalGames: 0,
  //     totalVictories: 0,
  //     totalDraws: 0,
  //     totalLosses: 0,
  //     goalsFavor: 0,
  //     goalsOwn: 0,
  //     goalsBalance: 0,
  //     efficiency: 0,
  //   }));
  // };

  // newLeaderBoard = (matche) => {}
}
