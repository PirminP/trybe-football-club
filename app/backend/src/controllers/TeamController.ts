import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private teamService: TeamService) {}

  async getAll(req: Request, res: Response) {
    const allTeams = await this.teamService.getAll();
    res.status(200).json(allTeams);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const oneTeam = await this.teamService.getById(Number(id));
    if (!oneTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    return res.status(200).json(oneTeam);
  }
}

export default TeamController;
