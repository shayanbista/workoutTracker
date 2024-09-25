import { has } from "cypress/types/lodash";
import { hashPassword } from "../utils/encrypter"
import * as userService from "./user"
import { BadRequestError } from "../error/BadRequestError";
import bcrypt from 'bcrypt';



import loggerWithNameSpace from "../utils/logger";
import { sign } from "jsonwebtoken";
import config from "../config";

const loginLog=loggerWithNameSpace('userlogin');

export const login=async(email:string,password:string)=>{

    loginLog.info("entering user login credentials");

    const hashedPassword=await hashPassword(password);
    const existingUser=await userService.findByEmail(email);

    if(!existingUser) throw new BadRequestError("email not found");


    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
    throw new BadRequestError("Passwords Don't Match");
    }

    let payload = {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.roles,
      };
    
      const accessToken = sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.accessExpiration,
      });
      const refreshToken = sign(payload, config.jwt.secret!, {
        expiresIn: config.jwt.refreshTokenExpiration,
      });

      return{accessToken,refreshToken}

}

