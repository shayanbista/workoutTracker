import { AppDataSource } from "../dataSource"
import { User } from "../entity/User"
import { WorkoutPlan } from "../entity/WorkoutPlan"
import { BadRequestError } from "../error/BadRequestError"
import { Plan } from "../interface/workoutPlan"

import * as workoutPlanService  from "./workoutPlan"
import * as exerciseService  from "./exercise"
import { WorkoutPlanExercise} from "../entity/WorkoutPlanExercise"
import {IWorkoutPlanExercise} from "../interface/workoutPlanExercise"
import { Exercise } from "../entity/Exercises"



const workoutPlanExerciseRepository=AppDataSource.getRepository(WorkoutPlanExercise);


const findexisitngExercise = async (workPlanId: string, exerciseId: number,weight:number) => {

    const serviceExists = await workoutPlanExerciseRepository.findOne({
      where: {
        workoutPlan: { id: workPlanId },  
        exercise: { id: exerciseId } ,
        weight    
      },
      relations: ["workoutPlan", "exercise"] 
    });
  

    return !!serviceExists;
  };


const removeExercise = async (
    workoutPlanExercise: Pick<IWorkoutPlanExercise, 'exerciseId' | 'workoutPlanId' | 'weight'>
  ) => {
      const { exerciseId, workoutPlanId, weight } = workoutPlanExercise; 
  
      const exerciseToDelete = await workoutPlanExerciseRepository.findOne({
          where: {
              weight: weight,  
              exercise: { id: exerciseId },  
              workoutPlan: { id: workoutPlanId.toString() },
          }
      });
  
      if (!exerciseToDelete) {
          throw new BadRequestError("No exercise found to delete");
      }
  
      const deletedExercise = await workoutPlanExerciseRepository.softDelete(exerciseToDelete.id);
  
      return 'deleted'; 
  };
  

  

const createPlanExercise=async(workoutPlanExercise:IWorkoutPlanExercise)=>{
    const planExercise=new WorkoutPlanExercise();
    planExercise.reps=workoutPlanExercise.reps;
    planExercise.sets=workoutPlanExercise.sets;
    planExercise.weight=workoutPlanExercise.weight;
    planExercise.exercise=workoutPlanExercise.exerciseId as unknown as Exercise;
    planExercise.workoutPlan=workoutPlanExercise.workoutPlanId as unknown as WorkoutPlan;
    await workoutPlanExerciseRepository.save(planExercise);

}


export const addWorkoutPlanExercises=async(workoutPlanExercise:IWorkoutPlanExercise)=>{
    try{
    const workoutPlanExists= await workoutPlanService.findPlanById(workoutPlanExercise.workoutPlanId);
    if(!workoutPlanExists) throw new BadRequestError("plan doesnot exist");
    const exerciseId=await exerciseService.getExerciseById(workoutPlanExercise.exerciseId);
    if(!exerciseId) return;

     const exerciseAlreadyInPlan = await findexisitngExercise(
      workoutPlanExercise.workoutPlanId.toString(),
      workoutPlanExercise.exerciseId,
      workoutPlanExercise.weight
    );

    if (exerciseAlreadyInPlan) {
      throw new BadRequestError("This exercise is already in the workout plan");
    }

    const newWorkoutExercise= await createPlanExercise(workoutPlanExercise);
    return true

    }catch(err){
        throw err
    }
}


export const removeWorkoutPlanExercises=async(workoutPlanExercise:Pick<IWorkoutPlanExercise, 'exerciseId' | 'workoutPlanId' | 'weight'>)=>{
    try{
    const workoutPlanExists= await workoutPlanService.findPlanById(workoutPlanExercise.workoutPlanId);
    if(!workoutPlanExists) throw new BadRequestError("plan doesnot exist");
    const exerciseId=await exerciseService.getExerciseById(workoutPlanExercise.exerciseId);
    const newWorkoutExercise= await removeExercise(workoutPlanExercise);
    console.log("workoutExercise",newWorkoutExercise);
    }catch(err){
        throw err
    }
}