import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginValidation from '../middlewares/loginValidation';

const userController = new UserController();
const routes = Router();

routes.post('/login', loginValidation, (req, res) => userController.UserLogin(req, res));

export default routes;
