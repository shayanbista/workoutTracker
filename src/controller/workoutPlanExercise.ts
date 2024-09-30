import httpStatusCodes from "http-status-codes";

import { Request } from "../interface/request";
import { Response, NextFunction } from "express";

import loggerWithNameSpace from "../utils/logger";

import * as workoutPlanService from "../service/workoutPlan";


const workoutPlanExerciseController = loggerWithNameSpace("workoutPlanExerciseController");
import * as workoutPlanExerciseService from "../service/workoutPlanExercise";


export const addWorkoutPlanExercises=async(req:Request,res:Response,next:NextFunction)=>{

    try{
        const newPlan=await workoutPlanExerciseService.addWorkoutPlanExercises(req.body);
        res.status(httpStatusCodes.CREATED).json("exercise added successfully")

    }catch(err){
        next(err)
    }
    
    

 


}
