import express from 'express';
import { UserController } from '../../db/actions/userActions';

const userR = express.Router();
const route = 'users';
const userCtrl = new UserController();

userR.get(`/${route}`, userCtrl.getUserDB);
userR.patch(`/${route}`, userCtrl.editUserDB);
userR.delete(`/${route}`, userCtrl.removeUserDB);

userR.post(`/${route}/sign-in`, userCtrl.addUserDB);
userR.post(`/${route}/log-in`, userCtrl.logInDB);
userR.post(`/${route}/log-out`, userCtrl.logOutDB);

userR.get(`/${route}/user-cart`, userCtrl.userAddEventToCartDB);

export default userR;
