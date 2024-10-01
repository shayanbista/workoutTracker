export interface IWorkoutPlanExercise {
  id: string;
  sets: number;
  reps: number;
  weight: number;
  workoutPlanId: number;
  exerciseId: number;
  updatedSets: number;
  updatedReps: number;
}
