import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteDateWorkoutPlan1727434311370 implements MigrationInterface {
  name = "DeleteDateWorkoutPlan1727434311370";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_plans" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_plans" DROP COLUMN "deleted_at"`,
    );
  }
}
