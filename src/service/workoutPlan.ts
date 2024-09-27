import { AppDataSource } from "../dataSource"
import { User } from "../entity/User"
import { WorkoutPlan } from "../entity/WorkoutPlan"
import { BadRequestError } from "../error/BadRequestError"
import { Plan } from "../interface/workoutPlan"

const workoutPlanRepository=AppDataSource.getRepository(WorkoutPlan)

const findByName=async(planName:string)=>{
    return workoutPlanRepository.findOne({where:{
        name:planName
    }})
}

const createNewPlan=async(workoutPlan:Plan)=>{
    let plan= new WorkoutPlan();
    plan.name=workoutPlan.name;
    plan.user=workoutPlan.userId as unknown as User;
    await workoutPlanRepository.save(plan)

}


export const addPlan=async(workoutPlan:Plan)=>{
    const existingPlan= await findByName(workoutPlan.name);
    if(existingPlan) throw new BadRequestError("plan already exists");
    const newPLan=await createNewPlan(workoutPlan);
    return true;
}