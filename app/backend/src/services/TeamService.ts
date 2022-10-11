import TeamModel from '../database/models/TeamModel';

class TeamService {
  constructor(private teamModel: typeof TeamModel) {}

  async getAll(): Promise<TeamModel[]> {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  async getById(id: number): Promise<TeamModel | null> {
    const oneTeam = await this.teamModel.findByPk(id);
    return oneTeam;
  }
}

export default TeamService;
