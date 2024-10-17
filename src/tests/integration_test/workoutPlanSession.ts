import * as sinon from 'sinon';
import { AppDataSource } from '../../dataSource';
import { WorkoutSession } from '../../entity/WorkoutPlanSession';
import { addWorkoutSession, updateWorkoutSession, deleteSession } from '../../service/workoutPlanSession';
import * as workoutPlanService from '../../service/workoutPlan';
import { BadRequestError } from '../../error/BadRequestError';
import assert from 'assert';

describe('Workout Session Service Integration Tests', () => {
  let sandbox: sinon.SinonSandbox;
  let repositoryStub: sinon.SinonStubbedInstance<any>;

  // Mock data for workout session
  const mockWorkoutSession = {
    id: 1,
    comments: 'Great session!',
    scheduledAt: new Date(),
    workoutPlan: {} as any, // Add a mock workout plan if necessary
  } as any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    repositoryStub = sandbox.stub(AppDataSource.getRepository(WorkoutSession));
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('addWorkoutSession', () => {
    it('should successfully add a new workout session', async () => {
      // Stub repository calls
      repositoryStub.findOne.resolves(null); // No existing session
      repositoryStub.save.resolves(mockWorkoutSession); // Simulate successful save

      const result = await addWorkoutSession(1, mockWorkoutSession);

      assert.strictEqual(result, true);
      sinon.assert.calledOnce(repositoryStub.save);
    });

    it('should throw BadRequestError if session already exists', async () => {
      repositoryStub.findOne.resolves(mockWorkoutSession); // Session already exists

      try {
        await addWorkoutSession(1, mockWorkoutSession);
        assert.fail('Should have thrown BadRequestError');
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, 'session already exists and cant be created');
      }
    });
  });

  describe('updateWorkoutSession', () => {
    it('should successfully update an existing workout session', async () => {
      // Stub repository calls
      repositoryStub.findOne.resolves(mockWorkoutSession); 
      repositoryStub.update.resolves({ affected: 1 }); 

      const result = await updateWorkoutSession(mockWorkoutSession.id, mockWorkoutSession);

      assert.strictEqual(result, true);
      sinon.assert.calledOnce(repositoryStub.update);
    });

    it('should throw BadRequestError if trying to create a session with an existing scheduled time', async () => {
      repositoryStub.findOne.resolves(mockWorkoutSession); 

      try {
        await updateWorkoutSession(mockWorkoutSession.id, mockWorkoutSession);
        assert.fail('Should have thrown BadRequestError');
      } catch (error) {
        assert.ok(error instanceof BadRequestError);
        assert.strictEqual(error.message, 'session already exists and cant be created');
      }
    });
  });

  describe('deleteSession', () => {
    it('should successfully delete a workout session', async () => {
      repositoryStub.softDelete.resolves({ affected: 1 }); 

      const result = await deleteSession(mockWorkoutSession.id);

      assert.strictEqual(result, true);
      sinon.assert.calledOnce(repositoryStub.softDelete);
    });
  });
});
