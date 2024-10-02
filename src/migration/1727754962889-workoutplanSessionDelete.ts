import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutplanSessionDelete1727754962889
  implements MigrationInterface
{
  name = "WorkoutplanSessionDelete1727754962889";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_sessions" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workout_sessions" DROP COLUMN "deleted_at"`,
    );
  }
}
