import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';
import TeamModel from '../database/models/TeamModel';

const router = Router();

const teamController = new TeamController(new TeamService(TeamModel));

router.get('/', (req, res) => teamController.getAll(req, res));
router.get('/:id', (req, res) => teamController.getById(req, res));

export default router;
