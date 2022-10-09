import { Router } from 'express';
import UserController from '../controllers/UserController';
import InputValidation from '../middlewares/inputValidation';
import UserModel from '../database/models/UserModel';

const router = Router();

const userController = new UserController();
const inputValidation = new InputValidation(UserModel);

router.post(
  '/',
  (req, res, next) => InputValidation.login(req, res, next),
  (req, res) => userController.login(req, res),
);

router.get(
  '/validate',
  (req, res, next) => inputValidation.tokenValidation(req, res, next),
  (req, res) => UserController.validToken(req, res),
);

export default router;
