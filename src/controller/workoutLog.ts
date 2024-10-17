import { Request } from "../interface/request";
import dayjs from "dayjs";
import httpStatusCodes from "http-status-codes";
import { Response, NextFunction } from "express";
import * as workoutLogService from "../service/workoutLog";
import { http } from "winston";

export const addWorkoutLog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    req.body.userId = userId;
    const workLog = await workoutLogService.addWorkoutLog(req.body);
    res.status(httpStatusCodes.OK).json("created successfully");
  } catch (err) {
    next(err);
  }
};

export const getUserReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id!;
    const report = await workoutLogService.userReport(Number(userId));
    res.status(httpStatusCodes.OK).json(report);
  } catch (err) {
    next(err);
  }
};
