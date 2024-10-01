import httpStatusCodes from "http-status-codes";

import { Request } from "../interface/request";
import { Response, NextFunction } from "express";

import loggerWithNameSpace from "../utils/logger";

import * as workOutPlanService from "../service/workoutPlan";

const workoutPlanSessionController = loggerWithNameSpace("workoutPlanSessionController");
import * as workoutSession from "../service/workoutPlanSession";

export const addWorkoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    workoutPlanSessionController.info("creating a new workout plan for the user");
    const workoutPlanId=req.params.id;
    const addSession = await workoutSession.addWorkoutSession(workoutPlanId,req.body);
    res.status(httpStatusCodes.CREATED).json("created successfully");
  } catch (err) {
    next(err);
  }
};

