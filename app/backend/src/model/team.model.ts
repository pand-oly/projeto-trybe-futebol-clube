import ITeam from '../interfaces/ITeam';
import teamModelDB from '../database/models/TeamModel';
import CustomError from '../error';

export default class TeamModel {
  private model = teamModelDB;

  public findAll = async (): Promise<ITeam[]> => {
    try {
      const result = await this.model.findAll();
      return result;
    } catch (error) {
      throw new CustomError(500, 'Erro database');
    }
  };

  public findOne = async (id: number): Promise<ITeam> => {
    try {
      const result = await this.model.findByPk(id);
      return result as ITeam;
    } catch (error) {
      throw new CustomError(500, 'Erro database');
    }
  };
}
