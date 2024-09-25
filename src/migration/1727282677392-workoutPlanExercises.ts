import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutPlanExercises1727282677392 implements MigrationInterface {
    name = 'WorkoutPlanExercises1727282677392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_plan_exercises" ("id" SERIAL NOT NULL, "sets" integer NOT NULL, "reps" integer NOT NULL, "weight" numeric NOT NULL, "workout_plan_id" integer, "exercise_id" integer, CONSTRAINT "PK_08ccbb1494256ed6ac36326f424" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout_plan_exercises" ADD CONSTRAINT "FK_ca979f355eb7bdbaff691812675" FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_plan_exercises" ADD CONSTRAINT "FK_53c4e4c7513a53bdf6733afc0d9" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_plan_exercises" DROP CONSTRAINT "FK_53c4e4c7513a53bdf6733afc0d9"`);
        await queryRunner.query(`ALTER TABLE "workout_plan_exercises" DROP CONSTRAINT "FK_ca979f355eb7bdbaff691812675"`);
        await queryRunner.query(`DROP TABLE "workout_plan_exercises"`);
    }

}
