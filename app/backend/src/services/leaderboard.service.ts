import MatcheModel from '../model/matche.model';
import TeamModel from '../model/team.model';
import ITeam from '../interfaces/ITeam';
import ITeamboard, { ICalcGames } from '../interfaces/ITeamboard';
import IMatche from '../interfaces/IMatche';

export default class LeaderboardService {
  constructor(private matcheModel: MatcheModel, private teamModel: TeamModel) {}

  public findHome = async (): Promise<ITeamboard[]> => {
    const teams = await this.teamModel.findAll();
    const board = teams.map(this.getBoardHome);

    const result = this.sortLeaderboard(await Promise.all(board));
    return result;
  };

  public findAway = async (): Promise<ITeamboard[]> => {
    const teams = await this.teamModel.findAll();
    const board = teams.map(this.getBoardAway);

    const result = this.sortLeaderboard(await Promise.all(board));
    return result;
  };

  public findAll = async (): Promise<ITeamboard[]> => {
    const teams = await this.teamModel.findAll();
    const board = teams.map(async (team) => {
      const boardHome = await this.getBoardHome(team);
      const boardAway = await this.getBoardAway(team);

      const result = this.calAllBoards(boardHome, boardAway);
      return result;
    });

    const result = this.sortLeaderboard(await Promise.all(board));
    return result;
  };

  private sortLeaderboard = (leaderboard: ITeamboard[]): ITeamboard[] => {
    leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

    return leaderboard;
  };

  private calAllBoards = (boardHome: ITeamboard, boardAway: ITeamboard): ITeamboard => {
    const totalPoints = boardAway.totalPoints + boardHome.totalPoints;
    const totalGames = boardAway.totalGames + boardHome.totalGames;
    return {
      name: boardAway.name,
      totalPoints,
      totalGames,
      totalVictories: boardAway.totalVictories + boardHome.totalVictories,
      totalDraws: boardAway.totalDraws + boardHome.totalDraws,
      totalLosses: boardAway.totalLosses + boardHome.totalLosses,
      goalsFavor: Number(boardAway.goalsFavor) + Number(boardHome.goalsFavor),
      goalsOwn: Number(boardAway.goalsOwn) + Number(boardHome.goalsOwn),
      goalsBalance: Number(boardAway.goalsBalance) + Number(boardHome.goalsBalance),
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  };

  private calcResultMatchesHome = (arrayMatches: IMatche[]): ICalcGames => {
    const resultGames = { totalPoints: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0 };

    arrayMatches.forEach((cur) => {
      if (cur.homeTeamGoals > cur.awayTeamGoals) {
        resultGames.totalVictories += 1;
      } else if (cur.homeTeamGoals === cur.awayTeamGoals) {
        resultGames.totalDraws += 1;
      } else {
        resultGames.totalLosses += 1;
      }
    });

    resultGames.totalPoints = resultGames.totalVictories * 3 + resultGames.totalDraws;

    return resultGames;
  };

  private calcResultMatchesAway = (arrayMatches: IMatche[]): ICalcGames => {
    const resultGames = { totalPoints: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0 };

    arrayMatches.forEach((cur) => {
      if (cur.homeTeamGoals < cur.awayTeamGoals) {
        resultGames.totalVictories += 1;
      } else if (cur.homeTeamGoals === cur.awayTeamGoals) {
        resultGames.totalDraws += 1;
      } else {
        resultGames.totalLosses += 1;
      }
    });

    resultGames.totalPoints = resultGames.totalVictories * 3 + resultGames.totalDraws;

    return resultGames;
  };

  private getBoardHome = async (team: ITeam): Promise<ITeamboard> => {
    const arrayMatchesHome = await this.matcheModel.findHomeTeam(team.id as number);

    const { goalsFavor, goalsOwn, totalGames } = await this
      .matcheModel.findCalcGoalsHome(team.id as number);

    const { totalPoints, totalVictories, totalDraws, totalLosses } = this
      .calcResultMatchesHome(arrayMatchesHome);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  };

  private getBoardAway = async (team: ITeam): Promise<ITeamboard> => {
    const arrayMatchesAway = await this.matcheModel.findAwayTeam(team.id as number);

    const { goalsFavor, goalsOwn, totalGames } = await this
      .matcheModel.findCalcGoalsAway(team.id as number);

    const { totalPoints, totalVictories, totalDraws, totalLosses } = this
      .calcResultMatchesAway(arrayMatchesAway);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
    };
  };
}
