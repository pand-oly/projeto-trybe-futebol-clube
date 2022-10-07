import MatcheModel from '../model/matche.model';
import IMatche from '../interfaces/IMatche';

type finised = { message: string };

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

  public create = async (matche: IMatche): Promise<IMatche> => {
    const result = await this.matcheModel.create(matche);
    return result;
  };

  public findByPk = async (id: number): Promise<IMatche> => {
    const result = await this.matcheModel.findByPk(id);
    return result;
  };

  public updateInProgressMatche = async (id: number): Promise<finised> => {
    await this.matcheModel.updateInProgressMatche(id);
    return { message: 'finished' };
  };
}
