import MatcheModel from '../model/matche.model';
import IMatche, { IUpdateGols } from '../interfaces/IMatche';

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

  public updateInProgress = async (id: number): Promise<finised> => {
    await this.matcheModel.updateInProgress(id);
    return { message: 'Finished' };
  };

  public updateGols = async (paramsBody: IUpdateGols): Promise<void> => {
    await this.matcheModel.updateGols(paramsBody);
  };
}
