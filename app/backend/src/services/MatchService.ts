import Team from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

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
}

export default MatchService;
