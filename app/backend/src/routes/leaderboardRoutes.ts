import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';
import TeamModel from '../database/models/TeamModel';

const router = Router();

const leaderboardController = new LeaderboardController(new LeaderboardService(TeamModel));

router.get('/', (req, res) => leaderboardController.getAllTeams(req, res));
router.get('/home', (req, res) => leaderboardController.getAllHomeTeams(req, res));
router.get('/away', (req, res) => leaderboardController.getAllAwayTeams(req, res));

export default router;
