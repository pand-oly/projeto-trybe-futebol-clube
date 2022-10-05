import MatcheModel from '../model/matche.model';
import IMatche from '../interfaces/IMatche';

export default class MatcheService {
  constructor(private matcheModel: MatcheModel) {}

  public findAll = async (): Promise<IMatche[]> => this.matcheModel.findAll();
}
