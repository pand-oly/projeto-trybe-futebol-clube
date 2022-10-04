import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserModel from '../model/user.model';
import UserService from '../services/user.service';
import checkLoginBody from '../middleware/loginValidate';

const loginRouter = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

loginRouter.post('/', checkLoginBody, (req, res, next) => userController.login(req, res, next));
loginRouter.get('/validate', (req, res, next) => userController.loginValidate(req, res, next));

export default loginRouter;
