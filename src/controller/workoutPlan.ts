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
    const userId=req.user?.id!;
    workoutPlanController.info("creating a new workout plan for the user");
    const planName=req.body as any;
    const name=planName.name;
    const plan={userId,name:name};
    const addPlan=await  workOutPlanService.addPlan(plan)
    res.status(httpStatusCodes.CREATED).json("created successfully");
  } catch (err) {
    next(err);
  }
};



  
  