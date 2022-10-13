import { Router } from 'express';
import MatchModel from '../database/models/MatchModel';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';

const router = Router();

const matchController = new MatchController(new MatchService(MatchModel));

router.get('/', (req, res) => matchController.getMatchList(req, res));

export default router;
