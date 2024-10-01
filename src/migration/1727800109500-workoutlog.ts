import { MigrationInterface, QueryRunner } from "typeorm";

export class Workoutlog1727800109500 implements MigrationInterface {
    name = 'Workoutlog1727800109500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "workout_log" ("id" SERIAL NOT NULL, "log_date" date NOT NULL, "completed" boolean NOT NULL, "notes" text, "userId" integer, "workoutPlanId" integer, CONSTRAINT "PK_71c59827176c502ae9484fe6bc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workout_log" ADD CONSTRAINT "FK_3fbd14264f9ce6f9cd8d9b8d7ae" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_log" ADD CONSTRAINT "FK_6dc9dfd7fe5718c3a0132cd636b" FOREIGN KEY ("workoutPlanId") REFERENCES "workout_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_log" DROP CONSTRAINT "FK_6dc9dfd7fe5718c3a0132cd636b"`);
        await queryRunner.query(`ALTER TABLE "workout_log" DROP CONSTRAINT "FK_3fbd14264f9ce6f9cd8d9b8d7ae"`);
        await queryRunner.query(`DROP TABLE "workout_log"`);
    }

}
