import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { User } from './User';
import { WorkoutPlan } from './WorkoutPlan';

@Entity()
export class WorkoutLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.workoutLogs)
  @JoinColumn({ name: 'userId' })
  user: User; 

  @ManyToOne(() => WorkoutPlan, (workoutPlan) => workoutPlan.workoutLogs)
  @JoinColumn({ name: 'workoutPlanId' })
  workoutPlan: WorkoutPlan; 

  @Column({ type: 'date' })
  logDate: Date; 

  @Column({ type: 'boolean' })
  completed: boolean; 

  @Column({ type: 'text', nullable: true })
  notes: string; 

  @DeleteDateColumn()
  deletedAt: Date;
}
