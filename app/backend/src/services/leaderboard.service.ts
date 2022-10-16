import MatcheModel from '../model/matche.model';
import TeamModel from '../model/team.model';
import ITeam from '../interfaces/ITeam';
import ITeamboard from '../interfaces/ITeamboard';

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
      totalVictories: Number(boardAway.totalVictories) + Number(boardHome.totalVictories),
      totalDraws: Number(boardAway.totalDraws) + Number(boardHome.totalDraws),
      totalLosses: Number(boardAway.totalLosses) + Number(boardHome.totalLosses),
      goalsFavor: Number(boardAway.goalsFavor) + Number(boardHome.goalsFavor),
      goalsOwn: Number(boardAway.goalsOwn) + Number(boardHome.goalsOwn),
      goalsBalance: Number(boardAway.goalsBalance) + Number(boardHome.goalsBalance),
      efficiency: ((totalPoints / (Number(totalGames) * 3)) * 100).toFixed(2),
    };
  };

  private getBoardHome = async (team: ITeam): Promise<ITeamboard> => {
    const {
      goalsFavor, goalsOwn, totalGames, totalVictories, totalDraws, totalLosses, goalsBalance,
    } = await this.matcheModel.findCalcGoalsHome(team.id as number);

    const totalPoints = Number(totalVictories) * 3 + Number(totalDraws);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: ((totalPoints / (Number(totalGames) * 3)) * 100).toFixed(2),
    };
  };

  private getBoardAway = async (team: ITeam): Promise<ITeamboard> => {
    const {
      goalsFavor, goalsOwn, totalGames, totalVictories, totalDraws, totalLosses, goalsBalance,
    } = await this.matcheModel.findCalcGoalsAway(team.id as number);

    const totalPoints = Number(totalVictories) * 3 + Number(totalDraws);

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: ((totalPoints / (Number(totalGames) * 3)) * 100).toFixed(2),
    };
  };
}
