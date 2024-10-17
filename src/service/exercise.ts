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

const findAll = () => {
  return exercisesRepository.find();
};

const findById = async (id: number) => {
  return exercisesRepository.findOne({
    where: {
      id,
    },
  });
};

// create a new exercise
export const createExercise = async (exerciseInformation: Exercise) => {
  console.log("exercise Information before creating", exerciseInformation);
  const newExercise = new Exercise();
  newExercise.name = exerciseInformation.name;
  console.log("new exercise information", newExercise.name);
  newExercise.type = exerciseInformation.type;
  newExercise.description = exerciseInformation.description;
  console.log("the exercise has been added");
  await exercisesRepository.save(newExercise);
};

// Function to create a new exercise
export const newExercise = async (exerciseInformation: Exercise) => {
  console.log("exercise Information", exerciseInformation);
  exerciseService.info("checking if the exercise already exists");
  const exerciseExists = await getByName(exerciseInformation.name);

  if (exerciseExists) {
    throw new BadRequestError("Exercise with this name already exists.");
  }

  exerciseService.info("exercise created");
  const newExercise = await createExercise(exerciseInformation);
  return true;
};

export const getExercises = async () => {
  exerciseService.info("fetching all the exercises");
  const fetchedExercises = await findAll();
  if (fetchedExercises.length === 0 || !fetchedExercises) {
    throw new BadRequestError("no exercises at the current moment");
  }
  return fetchedExercises;
};

export const getExerciseById = async (id: number) => {
  exerciseService.info("fetching the exercise based on its id");
  const fetchedExercise = await findById(id);
  if (!fetchedExercise)
    throw new BadRequestError("following exercise doesnt exist");
  return fetchedExercise;
};
