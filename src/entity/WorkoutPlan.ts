import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { WorkoutSession } from "./WorkoutPlanSession";
import { WorkoutPlanExercise } from "./WorkoutPlanExercise";

@Entity({ name: "workout_plans" })
export class WorkoutPlan {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.workoutPlans)
  user: User;


  @OneToMany(() => WorkoutPlanExercise, (workoutPlanExercise) => workoutPlanExercise.workoutPlan)
  workoutPlanExercises: WorkoutPlanExercise[];
  
  @OneToMany(
    () => WorkoutSession,
    (workoutSession) => workoutSession.workoutPlan,
  )
  workoutSessions: WorkoutSession[];
}
