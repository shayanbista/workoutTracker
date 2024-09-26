import httpStatusCodes from "http-status-codes";

import { Request } from "../interface/request";
import { Response, NextFunction } from "express";

import loggerWithNameSpace from "../utils/logger";

import * as exerciseService from "../service/exercise";

const exerciseController = loggerWithNameSpace("exerciseController");

export const addExercise = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    exerciseController.info("passing exercise information for addition");
    const addExercise = await exerciseService.newExercise(req.body);
    res.status(httpStatusCodes.CREATED).json("created successfully");
  } catch (err) {
    next(err);
  }
};


export const getExercises = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      exerciseController.info("passing exercise information for addition");
      const addExercise = await exerciseService.getExercises();
      res.status(httpStatusCodes.OK).json(addExercise);
    } catch (err) {
      next(err);
    }
  };

  export const getExercise= async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      exerciseController.info("getting all the aviliable exercises");
      const addExercise = await exerciseService.getExercises();
      res.status(httpStatusCodes.CREATED).json("created successfully");
    } catch (err) {
      next(err);
    }
  };
  
  