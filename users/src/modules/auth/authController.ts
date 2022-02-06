import { Request, Response } from "express";
import errorHandler from "../../helpers/errorHandler";
import responseHandler from "../../helpers/responseHandler";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../../entity/user.entity";
import bcrypt from "bcryptjs";

import axios from "axios";

class authController {
  static async login(req: any, res: Response) {
    try {
      const user = await getRepository(User).findOne({ email: req.body.email });
      console.log(user, "is my user")
      if (user) {
        const isPasswordMatch = await bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (isPasswordMatch) {
          const token = jwt.sign({ user }, process.env.SECRET_KEY!, {
            expiresIn: "1800s",
          });
          const data = {
            user,
            token,
          };

          return responseHandler(res, "Logged in ", 200, data);
        }
        return responseHandler(
          res,
          "Invalid login credentials ",
          200,
          "Invalid login credentials"
        );
      }
      return responseHandler(res, "User not found ", 404, "User not found");
    } catch (error: any) {
      console.error(error);
      return errorHandler(error!.message, 500, res);
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const user = await getRepository(User).findOne({ email: req.body.email },{
        select: ["id", "password"]
    });
      if (user) {
        return responseHandler(
          res,
          "User already with email ",
          400,
          "User already with email"
        );
      }
      const saltedPassword = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User();
      newUser.first_name = req.body.username;
      newUser.last_name = req.body.last_name;
      newUser.email = req.body.email;
      newUser.password = saltedPassword;
      newUser.is_ambassador = req.path === "/api/v1/ambassador/register";
      await getRepository(User).save(newUser);
      return responseHandler(res, "Added successfully", 201, newUser);
    } catch (error: any) {
      return errorHandler(error!.message, 500, res);
    }
  }

  static async profile(req: any, res: Response) {
    try {
      return responseHandler(res, "Added successfully", 200, req.user);
    } catch (error: any) {
      console.log(error);
      return errorHandler(error!.message, 500, res);
    }
  }
}

export default authController;
