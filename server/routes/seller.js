import {Router} from 'express'
import { isSellerAuth, sellerLogin, sellerLogout } from '../controller/selller.js';
import { authSeller } from '../middleware/authSeller.js';

const router = Router();

//@api endPoint = /api/seller/login
router.post('/login', sellerLogin);

router.post('/is-auth', authSeller, isSellerAuth);

router.post('/logout', sellerLogout);

export default router;