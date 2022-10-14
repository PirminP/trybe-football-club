import { Request, Response } from 'express';
import IMatch, { IScore } from '../interfaces/Match';
import MatchService from '../services/MatchService';

class MatchController {
  constructor(private matchService: MatchService) {}

  async getMatchList(req: Request, res: Response) {
    const { inProgress } = req.query;
    const matchList = await this.matchService.getMatchList(inProgress as string | undefined);
    res.status(200).json(matchList);
  }

  async createMatch(req: Request, res: Response) {
    const dataMatch = req.body as IMatch;
    const matchList = await this.matchService.createMatch(dataMatch);
    res.status(201).json(matchList);
  }

  async finshMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { message } = await this.matchService.finshMatch(id);
    const code = message === 'Finished' ? 200 : 404;
    res.status(code).json({ message });
  }

  async updateGoal(req: Request, res: Response) {
    const { id } = req.params;
    const newScore = req.body as IScore;
    const response = await this.matchService
      .updateGoal(parseInt(id, 10), newScore);
    res.status(200).json(response);
  }
}

export default MatchController;
