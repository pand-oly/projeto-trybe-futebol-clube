import ITeam from '../interfaces/ITeam';
import TeamModel from '../model/team.model';

export default class TeamService {
  constructor(private teamModel: TeamModel) {}

  public findAll = async (): Promise<ITeam[]> => this.teamModel.findAll();
}
