import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutPlanExerciseDeleteColumn1727688799071
  implements MigrationInterface
{
  name = "WorkoutPlanExerciseDeleteColumn1727688799071";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_plan_exercises" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_plan_exercises" DROP COLUMN "deleted_at"`,
    );
  }
}
