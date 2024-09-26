import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutPlan1727281536375 implements MigrationInterface {
  name = "WorkoutPlan1727281536375";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workout_plans" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_9ae1bdd02db446a7541e2e5b161" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workout_plans" ADD CONSTRAINT "FK_d7fb89ee8bd7affdaa0d9963c3f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_plans" DROP CONSTRAINT "FK_d7fb89ee8bd7affdaa0d9963c3f"`,
    );
    await queryRunner.query(`DROP TABLE "workout_plans"`);
  }
}
