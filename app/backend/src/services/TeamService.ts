// Section 2

import TeamModel from '../database/models/TeamModel';

class TeamService {
  constructor(private teamModel: typeof TeamModel) {}

  async getAllTeams(): Promise<TeamModel[]> {
    const teamTable = await this.teamModel.findAll();
    return teamTable;
  }

  async getByIdTeam(id: number): Promise<TeamModel | null> {
    const oneTeam = await this.teamModel.findByPk(id);
    return oneTeam;
  }
}

export default TeamService;
