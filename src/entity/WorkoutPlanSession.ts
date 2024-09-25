import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WorkoutPlan } from './WorkoutPlan';

@Entity({ name: "workout_sessions" })
export class WorkoutSession {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'timestamp' })
    scheduledAt: Date;

    @Column({ nullable: true })
    comments: string;


    @ManyToOne(() => WorkoutPlan, workoutPlan => workoutPlan.workoutSessions)
    workoutPlan: WorkoutPlan;

}
