// Section 2

import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private teamService: TeamService) {}

  async getAllTeams(req: Request, res: Response) {
    const teamTable = await this.teamService.getAllTeams();
    res.status(200).json(teamTable);
  }

  async getByIdTeam(req: Request, res: Response) {
    const { id } = req.params;
    const oneTeam = await this.teamService.getByIdTeam(Number(id));
    return res.status(200).json(oneTeam);
  }
}

export default TeamController;
