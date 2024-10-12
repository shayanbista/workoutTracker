import assert from "assert";
import sinon from "sinon";
import * as exerciseService from "../../service/exercise";
import { Exercise } from "../../entity/Exercises";
import { BadRequestError } from "../../error/BadRequestError";
import { exercisesRepository } from "../../service/exercise";

describe("Exercise Service", () => {
  let findStub: sinon.SinonStub;
  let findOneStub: sinon.SinonStub;
  let saveStub: sinon.SinonStub;

  const mockExercise: any = {
    id: 1,
    name: "Push-Up",
    type: "Strength",
    description: "An upper-body exercise.",
    workoutPlanExercises: [],
  };

  beforeEach(() => {
    findStub = sinon.stub(exercisesRepository, "find");
    findOneStub = sinon.stub(exercisesRepository, "findOne");
    saveStub = sinon.stub(exercisesRepository, "save");
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("newExercise", () => {
    it("should throw a BadRequestError if the exercise already exists", async () => {
      findOneStub.resolves(mockExercise); // Simulate existing exercise

      try {
        await exerciseService.newExercise(mockExercise);
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(error.message, "Exercise with this name already exists.");
      }

      sinon.assert.calledOnce(findOneStub);
    });

    it("should create a new exercise if it does not already exist", async () => {
      findOneStub.resolves(null); // No exercise found
      saveStub.resolves(mockExercise); // Simulate saving the new exercise

      const result = await exerciseService.newExercise(mockExercise);
      assert.strictEqual(result, true, "Expected result to be true");

      sinon.assert.calledOnce(findOneStub);
      sinon.assert.calledOnce(saveStub);
    });
  });

  describe("getExercises", () => {
    it("should return all exercises if they exist", async () => {
      findStub.resolves([mockExercise]);

      const exercises = await exerciseService.getExercises();
      assert(Array.isArray(exercises), "Expected result to be an array");
      assert(exercises.includes(mockExercise), "Expected array to include mockExercise");

      sinon.assert.calledOnce(findStub);
    });

    it("should throw a BadRequestError if no exercises are found", async () => {
      findStub.resolves([]); // Simulate no exercises found

      try {
        await exerciseService.getExercises();
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(error.message, "no exercises at the current moment");
      }

      sinon.assert.calledOnce(findStub);
    });
  });

  describe("getExerciseById", () => {
    it("should return the exercise if found by ID", async () => {
      findOneStub.resolves(mockExercise); // Simulate exercise found by ID

      const exercise = await exerciseService.getExerciseById(mockExercise.id);
      assert.deepStrictEqual(exercise, mockExercise, "Expected result to match mockExercise");

      sinon.assert.calledOnce(findOneStub);
    });

    it("should throw a BadRequestError if exercise is not found by ID", async () => {
      findOneStub.resolves(null); // Simulate no exercise found by ID

      try {
        await exerciseService.getExerciseById(mockExercise.id);
        assert.fail("Expected BadRequestError to be thrown");
      } catch (error) {
        assert(error instanceof BadRequestError, "Expected a BadRequestError");
        assert.strictEqual(error.message, "following exercise doesnt exist");
      }

      sinon.assert.calledOnce(findOneStub);
    });
  });
});
