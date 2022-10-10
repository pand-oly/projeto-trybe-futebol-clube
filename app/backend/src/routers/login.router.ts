import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserModel from '../model/user.model';
import UserService from '../services/user.service';
import checkLoginBody from '../middleware/loginValidate';
import validateAuthorization from '../middleware/validateAuthorization';

const loginRouter = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

loginRouter.post('/', checkLoginBody, userController.login);
loginRouter.get('/validate', validateAuthorization, UserController.loginValidate);

export default loginRouter;
