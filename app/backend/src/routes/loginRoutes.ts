import { Router } from 'express';
import UserController from '../controllers/UserController';
import inputValidation from '../middlewares/inputValidation';

const router = Router();

const userController = new UserController();

router.post(
  '/',
  (req, res, next) => inputValidation.login(req, res, next),
  (req, res) => userController.login(req, res),
);

export default router;
