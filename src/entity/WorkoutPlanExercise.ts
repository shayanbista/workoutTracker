import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";
import { Exercise } from "./Exercises";

@Entity({ name: "workout_plan_exercises" })
export class WorkoutPlanExercise {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column("decimal")
  weight: number;

  @ManyToOne(
    () => WorkoutPlan,
    (workoutPlan) => workoutPlan.workoutPlanExercises,
  )
  workoutPlan: WorkoutPlan;

  @ManyToOne(() => Exercise, (exercise) => exercise.workoutPlanExercises)
  exercise: Exercise;
}
