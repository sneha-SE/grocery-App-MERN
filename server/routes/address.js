import { Router } from "express";
import { authUser } from '../middleware/authUser.js';
import { addAddress, getAddress } from "../controller/address.js";

const routes = Router();

//@api endpoint = 
routes.post('/add', authUser, addAddress);
routes.post('/get-address', authUser, getAddress);

export default routes;
