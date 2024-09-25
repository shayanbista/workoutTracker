import { MigrationInterface, QueryRunner } from "typeorm";

export class UserName1727258972816 implements MigrationInterface {
    name = 'UserName1727258972816'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    }

}
