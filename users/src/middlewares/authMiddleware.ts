import jwt from 'jsonwebtoken'
import { User } from '../entity/user.entity'

import { Response,Request,NextFunction} from 'express'
import { getRepository } from 'typeorm'
class AuthMiddleware {
    static async isAuth(req:any,res:Response,next:NextFunction){
        try{
            const token = req.header('Authorization')?.replace('Bearer ','')
            console.log(token)
            const data:any = jwt.verify(token,process.env.SECRET_KEY!)
            console.log(data?.user.email,"is my data")
            console.log("now now")

            const user = await getRepository(User).findOne({email:data?.user.email})
            // const user = await User.findOne({where:{email:data.email}})
            if (!user){
                res.status(401).json({
                    success:false,
                    message:'Invalid token'
                })
            } else{
                req.user = user 
                req.token = token 
                next()
            }
        } catch (err){
            res.status(401).json({
                success:false,
                message:'You seem to be logged out, kindly retry again later'
            })
        }
    }
}
export default AuthMiddleware