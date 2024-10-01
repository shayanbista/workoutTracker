import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutPlanSessionID1727781187501 implements MigrationInterface {
    name = 'WorkoutPlanSessionID1727781187501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_sessions" DROP CONSTRAINT "PK_eea00e05dc78d40b55a588c9f57"`);
        await queryRunner.query(`ALTER TABLE "workout_sessions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "workout_sessions" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workout_sessions" ADD CONSTRAINT "PK_eea00e05dc78d40b55a588c9f57" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_sessions" DROP CONSTRAINT "PK_eea00e05dc78d40b55a588c9f57"`);
        await queryRunner.query(`ALTER TABLE "workout_sessions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "workout_sessions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "workout_sessions" ADD CONSTRAINT "PK_eea00e05dc78d40b55a588c9f57" PRIMARY KEY ("id")`);
    }

}
