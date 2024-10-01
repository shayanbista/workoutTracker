import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from "typeorm";
import { WorkoutPlan } from "./WorkoutPlan";

@Entity({ name: "workout_sessions" })
export class WorkoutSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  scheduledAt: Date;

  @Column({ nullable: true })
  comments: string;

  @ManyToOne(() => WorkoutPlan, (workoutPlan) => workoutPlan.workoutSessions)
  workoutPlan: WorkoutPlan;

  @DeleteDateColumn()
  deletedAt: Date;
}
