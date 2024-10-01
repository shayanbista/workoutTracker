import dayjs from "dayjs";
import { AppDataSource } from "../dataSource";
import { WorkoutLog } from "../entity/WorkoutLog";
import { WorkoutLogInput } from "../interface/workoutLog";
import { BadRequestError } from "../error/BadRequestError";
import { ConflictError } from "../error/ConflictError";
import { User } from "../entity/User";
import { WorkoutPlan } from "../entity/WorkoutPlan";

const workoutLogRepository = AppDataSource.getRepository(WorkoutLog);


const getWorkoutLog=async(userId:number, workoutPlanId:number)=>{
    return await workoutLogRepository.findOne({where:{
        user:{
            id:userId
        },
        workoutPlan:{id:workoutPlanId.toString()}       
    },
    relations:["user","workoutPlan"]
})
}

const createworkoutPlan=async(workoutLog:WorkoutLogInput)=>{

    const newWorkout=new WorkoutLog();
    newWorkout.logDate=workoutLog.logDate;
    newWorkout.notes=workoutLog.notes!;
    newWorkout.completed=workoutLog.completed;
    newWorkout.user=workoutLog.userId as unknown as User;
    newWorkout.workoutPlan=workoutLog.workoutPlanId as unknown as WorkoutPlan;
    await  workoutLogRepository.save(newWorkout);


}

export const addWorkoutLog=async(workoutLog:WorkoutLogInput )=>{
    const requestDate = workoutLog.logDate ? dayjs(workoutLog.logDate).startOf('day') : dayjs().startOf('day');
    const lastWorkoutLog = await  getWorkoutLog(workoutLog.userId, workoutLog.workoutPlanId);

    // Check if lastWorkoutLog exists
    if (lastWorkoutLog) {
      const lastLogDate = dayjs(lastWorkoutLog.logDate).startOf('day');
      const nextAllowedDate = lastLogDate.add(1, 'day'); 
      console.log("lastLogDate:", lastLogDate.toString(), "nextAllowedDate:", nextAllowedDate.toString());

      // Check if the current logDate is allowed
      if (dayjs(workoutLog.logDate).isBefore(nextAllowedDate)) {
         throw new BadRequestError("workout log not allowed");
      }
    }

    const newLog= await createworkoutPlan(workoutLog);

    return true


}



