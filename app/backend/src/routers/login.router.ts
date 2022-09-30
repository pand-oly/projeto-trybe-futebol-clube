import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserModel from '../model/user.model';
import UserService from '../services/user.service';

const loginRouter = Router();

const userModel = new UserModel();
const userService = new UserService(userModel);
const userController = new UserController(userService);

loginRouter.post('/', userController.findOne);

export default loginRouter;
