import { AppDataSource } from "../dataSource";
import { Exercise } from "../entity/Exercises";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

const exerciseService = loggerWithNameSpace("exerciseService");

// Accessing the repository for the Exercise entity
export const exercisesRepository = AppDataSource.getRepository(Exercise);

// function to get exercise by name
const getByName = async (exerciseName: string) => {
  return await exercisesRepository.findOne({
    where: { name: exerciseName },
  });
};

// create a new exercise
const createExercise = async (exerciseInformation: Exercise) => {
  const newExercise = new Exercise();
  newExercise.name = exerciseInformation.name;
  newExercise.type = exerciseInformation.type;
  newExercise.description = exerciseInformation.description;
  await exercisesRepository.save(newExercise);
};

// Function to create a new exercise
export const newExercise = async (exerciseInformation: Exercise) => {
  exerciseService.info("checking if the exercise already exists");
  const exerciseExists = await getByName(exerciseInformation.name);

  if (exerciseExists) {
    throw new BadRequestError("Exercise with this name already exists.");
  }

  // If exercise does not exist, save the new exercise
  exerciseService.info("user created");
  const newExercise = createExercise(exerciseInformation);
  return true;
};
