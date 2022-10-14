import Team from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import IMatch, { IScore } from '../interfaces/Match';

class MatchService {
  constructor(private matchModel: typeof MatchModel) {}

  async getMatchList(filter: string | undefined): Promise<MatchModel[]> {
    if (!filter || (filter !== 'true' && filter !== 'false')) {
      const matchList = await this.matchModel.findAll({
        include: [
          { model: Team, as: 'teamHome', attributes: ['teamName'] },
          { model: Team, as: 'teamAway', attributes: ['teamName'] },
        ],
      }); return matchList;
    }

    const inProgress = JSON.parse(filter);
    const matchList = await this.matchModel.findAll({
      where: {
        inProgress,
      },
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] },
      ],
    }); return matchList;
  }

  async createMatch(dataMatch: IMatch): Promise<MatchModel> {
    const matchList = await this.matchModel.create({ ...dataMatch, inProgress: true,
    });
    return matchList;
  }

  async finshMatch(id: string) {
    const match = await this.matchModel.findByPk(id);
    if (!match) return { message: 'Team not found' };
    await this.matchModel.update({ inProgress: false }, {
      where: {
        id,
      },
    });
    return { message: 'Finished' };
  }

  async updateGoal(id: number, updatedScore: IScore) {
    await this.matchModel.update(updatedScore, {
      where: {
        id,
      },
    });
    return { message: 'Updated' };
  }
}

export default MatchService;
