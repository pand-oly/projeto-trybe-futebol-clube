import ITeam from '../interfaces/ITeam';
import TeamModel from '../model/team.model';

export default class TeamService {
  constructor(private teamModel: TeamModel) {}

  private findAll = async (): Promise<ITeam[]> => this.teamModel.findAll();
}
