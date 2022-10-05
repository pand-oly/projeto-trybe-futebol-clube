import MatcheModel from '../model/matche.model';
import IMatche from '../interfaces/IMatche';

export default class MatcheService {
  constructor(private matcheModel: MatcheModel) {}

  public findAll = async (query: string): Promise<IMatche[]> => {
    if (query) {
      const inProgress = JSON.parse(query as string);
      const result = await this.matcheModel.queryInProgress(inProgress);
      return result;
    }
    return this.matcheModel.findAll();
  };
}
