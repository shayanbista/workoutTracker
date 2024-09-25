import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutPlanSession1727282826273 implements MigrationInterface {
    name = 'WorkoutPlanSession1727282826273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "scheduled_at" TIMESTAMP NOT NULL, "comments" character varying, "workout_plan_id" integer, CONSTRAINT "PK_eea00e05dc78d40b55a588c9f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout_sessions" ADD CONSTRAINT "FK_e70048237bc2ae2e6a26a05a8cc" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_sessions" DROP CONSTRAINT "FK_e70048237bc2ae2e6a26a05a8cc"`);
        await queryRunner.query(`DROP TABLE "workout_sessions"`);
    }

}
