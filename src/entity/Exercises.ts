import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, OneToMany } from 'typeorm';
import { WorkoutPlanExercise } from './WorkoutPlanExercise';

@Entity({ name: "exercises" })
export class Exercise {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    type: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @DeleteDateColumn() 
    deletedAt: Date; 

    @OneToMany(() => WorkoutPlanExercise, workoutPlanExercise => workoutPlanExercise.exercise,{cascade:true})
    workoutPlanExercises: WorkoutPlanExercise[];
}
