import MatcheModel from '../model/matche.model';
import TeamModel from '../model/team.model';
import ITeam from '../interfaces/ITeam';
import ITeamboard from '../interfaces/ITeamboard';
// import IMatche from '../interfaces/IMatche';

export default class LeaderboardService {
  constructor(private matcheModel: MatcheModel, private teamModel: TeamModel) {}

  public findAll = async (): Promise<ITeamboard[]> => {
    const teams = await this.teamModel.findAll();
    const test = teams.map(this.newboard);
    console.log(test);

    return test;
  };

  newboard = (team: ITeam) => ({
    name: team.teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  });
}
