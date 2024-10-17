import httpStatusCodes from "http-status-codes";

import { Response, NextFunction } from "express";

import { Request } from "../interface/request";

import loggerWithNameSpace from "../utils/logger";

const workoutPlanSessionController = loggerWithNameSpace(
  "workoutPlanSessionController",
);
import * as workoutSession from "../service/workoutPlanSession";

export const addWorkoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    workoutPlanSessionController.info(
      "creating a new workout plan session for the user",
    );
    const workoutPlanId = req.params.id;
    const addSession = await workoutSession.addWorkoutSession(
      workoutPlanId,
      req.body,
    );
    res.status(httpStatusCodes.CREATED).json("created successfully");
  } catch (err) {
    next(err);
  }
};

export const removeWorkoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    workoutPlanSessionController.info("removing workout plan for the user");
    const workoutSessionId = req.params.id;
    const addSession = await workoutSession.deleteSession(workoutSessionId);
    res.status(httpStatusCodes.NO_CONTENT).json("deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const updateWorkoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    workoutPlanSessionController.info("updating workout plan for the user");
    const workoutSessionId = req.params.id;
    const updateSession = await workoutSession.updateWorkoutSession(
      workoutSessionId,
      req.body,
    );
    res.status(httpStatusCodes.CREATED).json("updated successfully");
  } catch (err) {
    next(err);
  }
};
