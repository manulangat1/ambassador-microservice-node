import express, {Router } from 'express'
import AuthMiddleware from '../../middlewares/authMiddleware';
// import AuthMiddleware from '../../middlewares/authMiddleware';
import authController from './authController';



const router:Router = express.Router()


router.post('/login',authController.login)

router.post('/register',authController.register)
router.post('/ambassador/register',authController.register)
router.get('/profile',AuthMiddleware.isAuth,authController.profile)
export default router;