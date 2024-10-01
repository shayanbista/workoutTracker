import httpStatusCodes, { RESET_CONTENT } from "http-status-codes";

import { Request } from "../interface/request";
import { Response, NextFunction } from "express";

import loggerWithNameSpace from "../utils/logger";

import * as workoutPlanService from "../service/workoutPlan";

import * as workoutPlanExerciseService from "../service/workoutPlanExercise";

const workoutPlanExerciseController = loggerWithNameSpace(
  "workoutPlanExerciseController",
);

export const addWorkoutPlanExercise = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const newPlan = await workoutPlanExerciseService.addWorkoutPlanExercises(
      req.body,
    );
    res.status(httpStatusCodes.CREATED).json("exercise added successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteWorkoutPlanExercise = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletePlan =
      await workoutPlanExerciseService.removeWorkoutPlanExercises(req.body);
    res.status(httpStatusCodes.NO_CONTENT).json("deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const updateWorkoutPlanExercises = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatePlan =await workoutPlanExerciseService.updateWorkoutPlanExercises(req.body);
    res.status(httpStatusCodes.OK).json("updated successfully");
  } catch (err) {
    next(err);
  }
};
