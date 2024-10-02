// import httpStatusCodes from "http-status-codes";
// import { Request } from "../interface/request";
// import { Response, NextFunction } from "express";
// import loggerWithNameSpace from "../utils/logger";
// import * as workoutLogService from "../service/workoutLog";
// import dayjs from 'dayjs';

// const workoutLogController = loggerWithNameSpace("workoutLogController");

// export const addWorkoutLog = async (req: Request, res: Response, next: NextFunction) => {   
//   try {
//     // const { userId, workoutPlanId, logDate } = req.body; 

//     // Parse the logDate from the request body

//     const logDate = req.body.logDate ? dayjs(req.body.logDate).startOf('day') : dayjs().startOf('day');
//     console.log("requestDate", logDate.toString());

//     // const requestDate = new Date(logDate);  
//     // requestDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to compare the date only
//     // console.log("requestdate",requestDate);

//     // Check if a workout log already exists for the user, workout plan, and the given date
//     // const existingLog = await workoutLogService.getWorkoutLogByDate(userId, workoutPlanId, requestDate);

//     // if (existingLog) {
//     //   // If a log already exists for the date, return a conflict response
//     //   return res.status(httpStatusCodes.CONFLICT).json({
//     //     message: "You have already logged a workout for this date. Please wait until the next day (after 12 AM) to log another workout.",
//     //   });
//     // }

//     // // If no log exists for the given date, proceed to add the new workout log
//     // const newLog = await workoutLogService.addWorkoutLog({
//     //   userId,
//     //   workoutPlanId,
//     //   logDate: requestDate,
//     //   completed: req.body.completed || true, // Set completed as true or take from req.body
//     //   notes: req.body.notes || "", // Optional notes field
//     // });

//     // // Return a success response with the new workout log details
//     // return res.status(httpStatusCodes.CREATED).json({
//     //   message: "Workout log added successfully.",
//     //   log: newLog,
//     // });
//   } catch (err) {
//     next(err); // Handle any errors
//   }
// };

import dayjs from 'dayjs';
import httpStatusCodes from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as workoutLogService from '../service/workoutLog'; 
import { http } from 'winston';

export const addWorkoutLog = async (req: Request, res: Response, next: NextFunction) => {   
  try {
    
    const workLog=await workoutLogService.addWorkoutLog(req.body);
    res.status(httpStatusCodes.OK).json("created successfully");

  } catch (err) {
    next(err); 
  }
};
