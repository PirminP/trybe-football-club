import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private matchService: MatchService) {}

  async getMatchList(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matchList = await this.matchService.getMatchList(inProgress as string | undefined);
    res.status(200).json(matchList);
  }
}

export default MatchController;
