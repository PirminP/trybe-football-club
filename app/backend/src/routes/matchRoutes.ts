import { Router } from 'express';
import MatchModel from '../database/models/MatchModel';
import MatchService from '../services/MatchService';
import MatchController from '../controllers/MatchController';
import InputValidation from '../middlewares/inputValidation';

const router = Router();

const matchController = new MatchController(new MatchService(MatchModel));
const inputValidation = new InputValidation();

router.get('/', (req, res) => matchController.getMatchList(req, res));
router.post(
  '/',
  (req, res, next) => inputValidation.tokenValidation(req, res, next),
  (req, res, next) => inputValidation.matchValidation(req, res, next),
  (req, res) => matchController.createMatch(req, res),
);
router.patch(
  '/:id',
  (req, res, next) => InputValidation.scoreValidation(req, res, next),
  (req, res) => matchController.updateGoal(req, res),
);
router.patch('/:id/finish', (req, res) => matchController.finshMatch(req, res));

export default router;
