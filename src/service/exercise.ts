import { AppDataSource } from "../dataSource";
import { Exercise } from "../entity/Exercises";

export const exercisesRepository=AppDataSource.getRepository(Exercise);