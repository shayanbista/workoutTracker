import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutlogDeleteDateColumn1727800360254 implements MigrationInterface {
    name = 'WorkoutlogDeleteDateColumn1727800360254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_log" ADD "deleted_at" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_log" DROP COLUMN "deleted_at"`);
    }

}
