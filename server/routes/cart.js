import { Router } from 'express';
import { authUser } from '../middleware/authUser.js';
import { updateCart } from "../controller/cart.js";

const routes = Router();

routes.post('/update', authUser, updateCart);

export default routes

