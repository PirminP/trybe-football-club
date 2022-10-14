import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  async getAllHomeTeams(req: Request, res: Response) {
    const teamList = await this.leaderboardService.getAllHomeTeams();
    res.status(200).json(teamList);
  }
}

export default LeaderboardController;
