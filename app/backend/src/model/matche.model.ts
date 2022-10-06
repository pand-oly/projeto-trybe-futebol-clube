import matcheModelDB from '../database/models/MatcheModel';
import IMatche from '../interfaces/IMatche';
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
      throw new CustomError(500, 'Erro database');
    }
  };

  public queryInProgress = async (inProgress: boolean): Promise<IMatche[]> => {
    const result = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'home', attributes: { exclude: ['id'] } },
        { model: Team, as: 'away', attributes: { exclude: ['id'] } },
      ],
    });
    return result;
  };

  public create = async (matche: IMatche): Promise<IMatche> => {
    const result = await this.model.create(matche);
    return result;
  };
}
