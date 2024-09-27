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

const getAll = (userId: number) => {
    return workoutPlanRepository.find({
        where: {
            user: {
                id: userId,
            },
        },
        relations: ['user'], 
    });
};


const getById = (id: number, userId: number) => {
    return workoutPlanRepository.findOne({
        where: {
            id: id.toString(),  
            user: {
                id: userId
            }
        },
        relations: ['user'] 
    });
};


const createNewPlan=async(workoutPlan:Plan)=>{
    let plan= new WorkoutPlan();
    plan.name=workoutPlan.name;
    plan.user=workoutPlan.userId as unknown as User;
    await workoutPlanRepository.save(plan)

}

const deletePlan=async(id:number)=>{
    return await workoutPlanRepository.softDelete(id);
}


export const addPlan=async(workoutPlan:Plan)=>{
    const existingPlan= await findByName(workoutPlan.name);
    if(existingPlan) throw new BadRequestError("plan already exists");
    const newPLan=await createNewPlan(workoutPlan);
    return true;
}


export const removePlan=async(id:number)=>{
    const remove=await deletePlan(id);
    return true
}


export const getAllPlans=async(userId:number)=>{
    const  getAllPlans= await getAll(userId);
    if(!getAllPlans || getAllPlans.length==0) throw new BadRequestError("no existing plans of the user");
    return getAllPlans
}

export const getPlan=async(id:number,userId:number)=>{
    const  getplan= await getById(id,userId);
    if(!getplan) throw new BadRequestError("plan doesnt exist");
    return getplan
}