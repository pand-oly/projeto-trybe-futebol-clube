import matcheModelDB from '../database/models/MatcheModel';
import IMatche from '../interfaces/IMatche';
import CustomError from '../error';

export default class MatcheModel {
  private model = matcheModelDB;

  public findAll = async (): Promise<IMatche[]> => {
    try {
      const result = await this.model.findAll();
      return result;
    } catch (error) {
      throw new CustomError(500, 'Erro database');
    }
  };
}
