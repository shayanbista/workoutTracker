import * as sinon from 'sinon';
import { AppDataSource } from '../../dataSource';
import { WorkoutLog } from '../../entity/WorkoutLog';
import { WorkoutLogInput } from '../../interface/workoutLog';
import { addWorkoutLog, getWorkoutLogsForLast7Days, userReport } from '../../service/workoutLog';
import { BadRequestError } from '../../error/BadRequestError';
import { ConflictError } from '../../error/ConflictError';


import assert from 'assert';
import dayjs from 'dayjs';

describe('Workout Log Service Integration Tests', () => {
  let sandbox: sinon.SinonSandbox;
  let workoutLogRepositoryStub: sinon.SinonStubbedInstance<any>;
  let workoutPlanServiceStub: sinon.SinonStubbedInstance<any>;

  const mockWorkoutLogInput: WorkoutLogInput = {
    userId: 1,
    workoutPlanId: 1,
    logDate: new Date(),
    notes: 'Felt great!',
    completed: true,
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    workoutLogRepositoryStub = sandbox.stub(AppDataSource.getRepository(WorkoutLog));
    workoutPlanServiceStub = sandbox.stub(workoutPlanServiceStub);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('addWorkoutLog', () => {
    it('should successfully add a workout log', async () => {
      // Stubbing the necessary methods
      workoutPlanServiceStub.findPlanById.resolves(true); // Plan exists
      workoutLogRepositoryStub.findOne.resolves(null); // No existing log for the day
      workoutLogRepositoryStub.findOne.withArgs(sinon.match({ user: { id: 1 }, logDate: sinon.match.any })).resolves(null); // No existing log
      workoutLogRepositoryStub.save.resolves(mockWorkoutLogInput); // Simulate successful save

      const result = await addWorkoutLog(mockWorkoutLogInput);

      assert.deepStrictEqual(result, mockWorkoutLogInput);
      sinon.assert.calledOnce(workoutLogRepositoryStub.save);
    });

    it('should throw BadRequestError if workout plan does not exist', async () => {
      workoutPlanServiceStub.findPlanById.resolves(null); // Plan does not exist

      try {
        await addWorkoutLog(mockWorkoutLogInput);
        assert.fail('Should have thrown BadRequestError');
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, "the workout plan doesnt exist");
      }
    });

    it('should throw ConflictError if a workout log already exists for the day', async () => {
      workoutPlanServiceStub.findPlanById.resolves(true); // Plan exists
      workoutLogRepositoryStub.findOne.resolves(mockWorkoutLogInput); // Log exists for the day

      try {
        await addWorkoutLog(mockWorkoutLogInput);
        assert.fail('Should have thrown ConflictError');
      } catch (error) {
        assert.ok(error instanceof ConflictError);
        assert.strictEqual(error.message, "A workout log already exists for this day");
      }
    });

    it('should throw BadRequestError if the workout log date is not allowed', async () => {
      workoutPlanServiceStub.findPlanById.resolves(true); // Plan exists
      workoutLogRepositoryStub.findOne.onFirstCall().resolves(mockWorkoutLogInput); // Last log exists for the day

      try {
        await addWorkoutLog(mockWorkoutLogInput);
        assert.fail('Should have thrown BadRequestError');
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, "workout log not allowed");
      }
    });
  });

  describe('getWorkoutLogsForLast7Days', () => {
    it('should retrieve workout logs for the last 7 days', async () => {
      const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day").toDate();
      const today = dayjs().endOf("day").toDate();
      const mockLogs = [mockWorkoutLogInput]; // Mock logs

      workoutLogRepositoryStub.find.resolves(mockLogs); // Simulate retrieval

      const result = await getWorkoutLogsForLast7Days(mockWorkoutLogInput.userId);

      assert.deepStrictEqual(result, mockLogs);
      sinon.assert.calledOnce(workoutLogRepositoryStub.find);
    });
  });

  describe('userReport', () => {
    it('should generate a user report for the last 7 days', async () => {
      const mockLogs = [mockWorkoutLogInput];

      // Stubbing the getWorkoutLogsForLast7Days method
      sandbox.stub().resolves(mockLogs);

      const result = await userReport(mockWorkoutLogInput.userId);

      assert.deepStrictEqual(result, mockLogs);
    });
  });
});
