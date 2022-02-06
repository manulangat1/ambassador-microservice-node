import express, {Router } from 'express'
import adminController from './adminController';
import { CreateProduct, GetProduct, Products } from './productController';
// import AuthMiddleware from '../../middlewares/authMiddleware';
// // import AuthMiddleware from '../../middlewares/authMiddleware';
// import authController from './authController';



const router:Router = express.Router()


router.post('/login',adminController.login)

router.post('/register',adminController.register)
// router.post('/ambassador/register',authController.register)
router.get('/profile',adminController.profile)

router.post('/product', CreateProduct)
router.get('/product/', GetProduct)
export default router;