import httpStatusCodes from "http-status-codes";

import { Request } from "../interface/request";
import { Response, NextFunction } from "express";

import loggerWithNameSpace from "../utils/logger";

import * as exerciseService from "../service/exercise";

const workoutPlanController = loggerWithNameSpace("workoutPlanController");

export const addWorkoutPlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {

    const user=req.user?.id;
    workoutPlanController.info("creating a new workout plan for the user");
    const addExercise = await exerciseService.newExercise(req.body);
    res.status(httpStatusCodes.CREATED).json("created successfully");
  } catch (err) {
    next(err);
  }
};



  
  