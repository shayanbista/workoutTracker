import { AppDataSource } from "../../dataSource";
import { Exercise } from "../../entity/Exercises";
import { BadRequestError } from "../../error/BadRequestError";
import { newExercise, getExercises, getExerciseById } from "../../service/exercise";
import { exercisesRepository } from "../../service/exercise";
import assert from 'assert';

describe("Exercise Service Integration Tests", function() {
  this.timeout(10000); 

  before(async function() {
    await AppDataSource.initialize();
  });

  after(async function() {
    await AppDataSource.destroy();
  });

  beforeEach(async function() {
    // Clear all tables in the correct order
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities.reverse()) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.query(`TRUNCATE "${entity.tableName}" CASCADE`);
    }
  });

  describe("newExercise", function() {
    try{
    it("should create a new exercise", async function() {
      const exerciseInfo = {
        name: "Push-ups",
        type: "Strength",
        description: "A classic upper body exercise"
      };

      const result = await newExercise(exerciseInfo as Exercise);
      assert.strictEqual(result, true);

      const savedExercise = await  exercisesRepository.findOne({ where: { name: "Push-ups" } }); 
      assert(savedExercise, "Exercise should be saved");
      assert.strictEqual(savedExercise.name, "Push-ups");
      assert.strictEqual(savedExercise.type, "Strength");
      assert.strictEqual(savedExercise.description, "A classic upper body exercise");
    });
  }catch(err){
    console.log("err",err);
  }

    it("should throw BadRequestError if exercise already exists", async function() {
      const exerciseInfo = {
        name: "Squats",
        type: "Strength",
        description: "A lower body exercise"
      };

      await newExercise(exerciseInfo as Exercise);

      await assert.rejects(
        async () => await newExercise(exerciseInfo as Exercise),
        BadRequestError
      );
    });
  });

  describe("getExercises", function() {
    it("should return all exercises", async function() {
      const exercise1 = { name: "Lunges", type: "Strength", description: "A leg exercise" };
      const exercise2 = { name: "Plank", type: "Core", description: "A core stability exercise" };

      await newExercise(exercise1 as Exercise);
      await newExercise(exercise2 as Exercise);

      const fetchedExercises = await getExercises();
      assert.strictEqual(fetchedExercises.length, 2);
      assert(fetchedExercises.some(e => e.name === "Lunges"), "Should contain Lunges");
      assert(fetchedExercises.some(e => e.name === "Plank"), "Should contain Plank");
    });

    it("should throw BadRequestError if no exercises exist", async function() {
      await assert.rejects(
        async () => await getExercises(),
        BadRequestError
      );
    });
  });

  describe("getExerciseById", function() {
    it("should return exercise by id", async function() {
      const exerciseInfo = {
        name: "Crunches",
        type: "Core",
        description: "An abdominal exercise"
      };

      await newExercise(exerciseInfo as Exercise);
      const savedExercise = await AppDataSource.getRepository(Exercise).findOne({ where: { name: "Crunches" } });

      if (savedExercise) {
        const fetchedExercise = await getExerciseById(savedExercise.id);
        assert(fetchedExercise, "Exercise should be fetched");
        assert.strictEqual(fetchedExercise.name, "Crunches");
        assert.strictEqual(fetchedExercise.type, "Core");
        assert.strictEqual(fetchedExercise.description, "An abdominal exercise");
      } else {
        assert.fail("Exercise was not saved correctly");
      }
    });

    it("should throw BadRequestError if exercise doesn't exist", async function() {
      await assert.rejects(
        async () => await getExerciseById(999),
        BadRequestError
      );
    });
  });
});