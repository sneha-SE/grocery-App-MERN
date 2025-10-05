import express from "express";
import { isAuth, login, logOut, register } from "../controller/user.js";
import { authUser } from "../middleware/authUser.js";

const routes = express.Router();

routes.post('/register', register);
routes.post('/login', login);
routes.get('/is-auth', authUser, isAuth);
routes.get('/logout', authUser, logOut);

export default routes;
