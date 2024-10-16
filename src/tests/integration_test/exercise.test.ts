import assert from "assert";
import sinon from "sinon";
import { AppDataSource } from "../../dataSource";
import {
  exercisesRepository,
  newExercise,
  getExercises,
  getExerciseById,
} from "../../service/exercise";
import { Exercise } from "../../entity/Exercises";
import { BadRequestError } from "../../error/BadRequestError";

describe("Exercise Service Integration Tests", function () {
  // Extend the default timeout to 10 seconds for all tests
  this.timeout(10000);

  before(async function () {
    // Increase timeout specifically for this hook
    this.timeout(10000); // 10 seconds
    console.log("Initializing data source...");

    // Initialize AppDataSource for testing
    await AppDataSource.initialize();

    console.log("Data source initialized");
  });

  after(async () => {
    // Cleanup after all tests
    console.log("Destroying data source...");
    await AppDataSource.destroy();
    console.log("Data source destroyed");
  });

  describe("Fetching all exercises", () => {
    it("should return all exercises", async () => {
      // Seed the database with exercises
      const exercise1 = exercisesRepository.create({
        name: "Push Up",
        type: "Strength",
        description: "A basic push-up",
      });
      const exercise2 = exercisesRepository.create({
        name: "Squat",
        type: "Strength",
        description: "A basic squat",
      });
      await exercisesRepository.save([exercise1, exercise2]);

      const exercises = await getExercises();
      assert.strictEqual(exercises.length, 2);
      assert.strictEqual(exercises[0].name, "Push Up");
      assert.strictEqual(exercises[1].name, "Squat");
    });

    it("should throw an error if no exercises are found", async () => {
      try {
        await getExercises();
        assert.fail("Expected error not thrown");
      } catch (error: any) {
        assert(
          error instanceof BadRequestError,
          "Error should be an instance of BadRequestError",
        );
        assert.strictEqual(error.message, "no exercises at the current moment");
      }
    });
  });

  describe("Fetching exercise by ID", () => {
    it("should return an exercise by valid ID", async () => {
      const exercise = exercisesRepository.create({
        name: "Bench Press",
        type: "Strength",
        description: "A bench press",
      });
      const savedExercise = await exercisesRepository.save(exercise);

      const fetchedExercise = await getExerciseById(savedExercise.id);
      assert.strictEqual(fetchedExercise!.name, "Bench Press");
      assert.strictEqual(fetchedExercise!.type, "Strength");
    });

    it("should throw an error if exercise does not exist", async () => {
      try {
        await getExerciseById(999);
        assert.fail("Expected error not thrown");
      } catch (error: any) {
        assert(
          error instanceof BadRequestError,
          "Error should be an instance of BadRequestError",
        );
        assert.strictEqual(error.message, "following exercise doesnt exist");
      }
    });
  });

  describe("Creating a new exercise", () => {
    it("should create a new exercise if it does not exist", async () => {
      const exerciseData = {
        name: "Deadlift",
        type: "Strength",
        description: "A basic deadlift",
      };

      await newExercise(exerciseData as Exercise);
      const createdExercise = await exercisesRepository.findOne({
        where: { name: "Deadlift" },
      });

      assert.notStrictEqual(createdExercise, null);
      assert.strictEqual(createdExercise!.name, "Deadlift");
    });

    it("should throw an error if the exercise with the same name already exists", async () => {
      const exerciseData = {
        name: "Deadlift",
        type: "Strength",
        description: "A basic deadlift",
      };
      await newExercise(exerciseData as Exercise);
      try {
        await newExercise(exerciseData as Exercise);
        assert.fail("Expected error not thrown");
      } catch (error: any) {
        assert(
          error instanceof BadRequestError,
          "Error should be an instance of BadRequestError",
        );
        assert.strictEqual(
          error.message,
          "Exercise with this name already exists.",
        );
      }
    });
  });
});
