// import sequelize = require('sequelize');
import matcheModelDB from '../database/models/MatcheModel';
import IMatche, { IUpdateGols } from '../interfaces/IMatche';
// import { IResultsMatchesAway, IResultsMatchesHome } from '../interfaces/ITeamboard';
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

  public findHomeTeam = async (homeTeam: number): Promise<IMatche[]> => {
    try {
      const result = await this.model.findAll({ where: { homeTeam, inProgress: false } });
      return result;
    } catch (error) {
      throw new CustomError(500, 'Erro findHomeTeam matche database');
    }
  };

  public findAwayTeam = async (awayTeam: number): Promise<IMatche[]> => {
    try {
      const result = await this.model.findAll({ where: { awayTeam, inProgress: false } });
      return result;
    } catch (error) {
      throw new CustomError(500, 'Erro findHomeTeam matche database');
    }
  };

  // public findHomeTeam = async (homeTeam: number): Promise<IResultsMatchesHome[]> => {
  //   try { //! sequelize fail
  //     const result = await this.model.findAll({
  //       where: { homeTeam, inProgress: false },
  //       attributes: [
  //         [sequelize.fn('sum', sequelize.col('home_team_goals')), 'sumGoalsFavorHome'],
  //         [sequelize.fn('sum', sequelize.col('away_team_goals')), 'sumGoalsOwnHome'],
  //       ],
  //     }) as unknown;
  //     return result as IResultsMatchesHome[];
  //   } catch (error) {
  //     console.log(error);
  //     throw new CustomError(500, 'Erro findHomeTeam matche database');
  //   }
  // };

  // public findAwayTeam = async (awayTeam: number): Promise<IResultsMatchesAway> => {
  //   try { //! sequelize fail
  //     const result = await this.model.findAll({
  //       where: { awayTeam, inProgress: false },
  //       attributes: [
  //         [sequelize.fn('sum', sequelize.col('away_team_goals')), 'sumGoalsFavorAway'],
  //         [sequelize.fn('sum', sequelize.col('home_team_goals')), 'sumGoalsOwnAway'],
  //       ],
  //     });
  //     const { sumGoalsFavorAway, sumGoalsOwnAway } = result[0] as IMatche;
  //     console.log(sumGoalsFavorAway);
  //     return { sumGoalsFavorAway, sumGoalsOwnAway } as IResultsMatchesAway;
  //     // return result[0] as IResultsMatchesAway;
  //   } catch (error) {
  //     console.log(error);
  //     throw new CustomError(500, 'Erro findAwayTeam matche database');
  //   }
  // };

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
