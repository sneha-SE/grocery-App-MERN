import { Router } from "express";
import {upload} from '../config/multer.js'
import {authSeller} from "../middleware/authSeller.js"
import { addProduct, ChangeStock, ProductById, ProductList } from "../controller/product.js";

const routes = Router()

routes.post('/add', upload.array(["Images"]), authSeller, addProduct)

routes.get('/list', ProductList);

routes.get('/id', ProductById);

routes.post('/stock', authSeller, ChangeStock)

export default routes