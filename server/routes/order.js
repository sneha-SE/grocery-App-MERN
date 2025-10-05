import { Router } from "express";
import { authUser } from "../middleware/authUser.js";
import { getUserOrder, placeOrder } from "../controller/order.js";
import { authSeller } from "../middleware/authSeller.js";

const routes = Router()

routes.post('/cod', authUser, placeOrder);

routes.get('/user', authUser, getUserOrder);

routes.get('/seller', authSeller, getUserOrder)


export default routes;