// import { has } from "cypress/types/lodash";
// import { hashPassword } from "../utils/encrypter"
// import * as userService from "./user"
// import { BadRequestError } from "../error/BadRequestError";
// import bcrypt from 'bcrypt';

// import loggerWithNameSpace from "../utils/logger";
// import { sign } from "jsonwebtoken";
// import config from "../config";

// const loginLog=loggerWithNameSpace('userlogin');

// export const login=async(email:string,password:string)=>{

//     loginLog.info("entering user login credentials");

//     const hashedPassword=await hashPassword(password);
//     const existingUser=await userService.findByEmail(email);

//     if(!existingUser) throw new BadRequestError("email not found");

//     const isPasswordValid = await bcrypt.compare(password, existingUser.password);

//     if (!isPasswordValid) {
//     throw new BadRequestError("Passwords Don't Match");
//     }

//     const permissions=

//     let payload = {
//         name: existingUser.name,
//         email: existingUser.email,
//         role: existingUser.roles,
//       };

//       const accessToken = sign(payload, config.jwt.secret!, {
//         expiresIn: config.jwt.accessExpiration,
//       });
//       const refreshToken = sign(payload, config.jwt.secret!, {
//         expiresIn: config.jwt.refreshTokenExpiration,
//       });

//       return{accessToken,refreshToken}

// }

import { User } from "../interface/user";
import * as userService from "../service/user";
import { comparePassword } from "../utils/encrypter";

import config from "../config";
import { sign } from "jsonwebtoken";
import { BadRequestError } from "../error/BadRequestError";

interface CustomJwtPayload {
  email: string;
  id: string;
}

export const login = async (body: Pick<User, "email" | "password">) => {
  const existingUser = await userService.findByEmail(body.email);

  if (!existingUser) {
    return null;
  }
  const userPassword = await comparePassword(
    body.password,
    existingUser.password,
  );

  if (!userPassword) throw new BadRequestError("Password doesnt match");

  const user = await userService.getUser(existingUser.id);
  if (!user) throw new BadRequestError("Account doesnt match");

  const roleName = user.roles.map((role) => role.name);

  const permissions = user.roles.flatMap((role) =>
    role.permissions.map((permission) => permission.name),
  );

  const payload = {
    id: user.id,
    email: existingUser.email,
    role: roleName,
    permissions: permissions,
  };

  const secretKey = config.jwt.secret!;
  const accessToken = sign(payload, secretKey, {
    expiresIn: config.jwt.accessExpiration,
  });

  const refreshToken = sign(payload, secretKey, {
    expiresIn: config.jwt.refreshTokenExpiration,
  });

  return { accessToken, refreshToken };
};
