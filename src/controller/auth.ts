import httpStatusCodes from "http-status-codes";

import { NextFunction } from "express";
import { Response } from "express";


import { Request } from "../interface/request";

import * as authService from "../service/auth";

export const login= async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let { email, password} = req.body;
    try {
      const userLogin= await authService.login(email,password);
      res.status(httpStatusCodes.OK).json(userLogin);
    } catch (err) {
      next(err);
    }
  };