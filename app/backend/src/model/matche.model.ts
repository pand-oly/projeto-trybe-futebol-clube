import matcheModelDB from '../database/models/MatcheModel';
import IMatche, { IUpdateGols } from '../interfaces/IMatche';
import CustomError from '../error';
import Team from '../database/models/TeamModel';

export default class MatcheModel {
  private model = matcheModelDB;

  public findAll = async (): Promise<IMatche[]> => {
    try {
      const result = await this.model.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return result;
    } catch (error) {
      throw new CustomError(500, 'Erro findAll database');
    }
  };

  public queryInProgress = async (inProgress: boolean): Promise<IMatche[]> => {
    try {
      const result = await this.model.findAll({
        where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],
      });
      return result;
    } catch (error) {
      throw new CustomError(500, 'Erro findAll database');
    }
  };

  public findByPk = async (id: number): Promise<IMatche> => {
    try {
      const result = await this.model.findByPk(id) as IMatche;
      return result;
    } catch (error) {
      throw new CustomError(500, 'Erro findByPk matche database');
    }
  };

  public create = async (matche: IMatche): Promise<IMatche> => {
    try {
      const result = await this.model.create(matche);
      return result;
    } catch (error) {
      throw new CustomError(500, 'Erro create new objct database');
    }
  };

  public updateInProgress = async (id: number): Promise<number> => {
    try {
      const [rows] = await this.model.update({ inProgress: false }, { where: { id } });
      return rows;
    } catch (error) {
      throw new CustomError(500, 'Erro update matche database');
    }
  };

  public updateGols = async (obj: IUpdateGols): Promise<void> => {
    const { id, homeTeamGoals, awayTeamGoals } = obj;
    try {
      await this.model.update(
        { homeTeamGoals, awayTeamGoals },
        { where: { id } },
      );
    } catch (error) {
      throw new CustomError(500, 'Erro update matche database');
    }
  };
}
