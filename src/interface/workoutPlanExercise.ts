export interface IWorkoutPlanExercise {
  id: string | number;
  sets: number;
  reps: number;
  weight: number;
  workoutPlanId: number ;
  exerciseId: number;
  updatedSets: number;
  updatedReps: number;
}
