import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';

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
}
