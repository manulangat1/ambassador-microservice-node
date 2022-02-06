import { Request, Response } from "express";
import errorHandler from "../../helpers/errorHandler";
import responseHandler from "../../helpers/responseHandler";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
// import { User } from "../../entity/user.entity";
import bcrypt from "bcryptjs";
import { UserService } from "../../services/userService";
import axios from "axios";

class adminController {
  static async profile(req: any, res: Response) {
    try {
      return responseHandler(res, "Added successfully", 200, req.user);
    } catch (error: any) {
      console.log(error);
      return errorHandler(error!.message, 500, res);
    }
  }

  static async register(req: any, res: Response) {

    try {
      const body = req.body;
      console.log(body)
    const user = await UserService.post('register', {
        ...body,
        is_ambassador: false
    });
      return responseHandler(res, "Added successfully", 200, user);
    } catch (error: any) {
      // console.log(error);
      return errorHandler(error!.message, 500, res);
    }
  }

  static async login(req: any, res: Response) {
    try {
      const body = req.body;

      const data = await UserService.post("login", {
        ...body,
        scope: "admin",
      });

      return responseHandler(res, "Added successfully", 200, data);
    } catch (error: any) {
      console.log(error);
      return errorHandler(error!.message, 500, res);
    }
  }
}

export default adminController;
