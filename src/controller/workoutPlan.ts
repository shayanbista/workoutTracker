import httpStatusCodes from "http-status-codes";

import { Request } from "../interface/request";
import { Response, NextFunction } from "express";

import loggerWithNameSpace from "../utils/logger";

import * as workOutPlanService from "../service/workoutPlan";

const workoutPlanController = loggerWithNameSpace("workoutPlanController");

export const addWorkoutPlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id!;
    workoutPlanController.info("creating a new workout plan for the user");
    const planName = req.body as any;
    const name = planName.name;
    const plan = { userId, name: name };
    const addPlan = await workOutPlanService.addPlan(plan);
    res.status(httpStatusCodes.CREATED).json("created successfully");
  } catch (err) {
    next(err);
  }
};

export const removeWorkoutPlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id!;
    workoutPlanController.info("removing the workout Plan of the user");
    const workoutPlanId = req.params.id;
    const removePlan = await workOutPlanService.removePlan(workoutPlanId);
    res.status(httpStatusCodes.NO_CONTENT).json("deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const getWorkoutPlans = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id!;
    workoutPlanController.info("fetching all the workout plans of that user");
    const plans = await workOutPlanService.getAllPlans(userId);
    res.status(httpStatusCodes.OK).json(plans);
  } catch (err) {
    next(err);
  }
};

export const getWorkoutPlan = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id!;
    const id = req.params.id;
    workoutPlanController.info("fetching all the workout plans of that user");
    const plans = await workOutPlanService.getPlan(id, userId);
    res.status(httpStatusCodes.OK).json(plans);
  } catch (err) {
    next(err);
  }
};
