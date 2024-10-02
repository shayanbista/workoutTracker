import httpStatusCodes from "http-status-codes";
import { NextFunction } from "express";
import { Response } from "express";

import { Request } from "../interface/request";

import * as userService from "../service/user";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let { email, password, role, name } = req.body;

  try {
    const data = await userService.createUser(email, password, role, name);
    res.status(httpStatusCodes.CREATED).json({ message: "signup success" });
  } catch (err) {
    next(err);
  }
};
