import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRolesPermission1727245616355 implements MigrationInterface {
  name = "UserRolesPermission1727245616355";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("users_id" integer NOT NULL, "roles_id" integer NOT NULL, CONSTRAINT "PK_65ec3daed53f391c53df7e2e8fb" PRIMARY KEY ("users_id", "roles_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8e1215206acb19f1c38dbda909" ON "user_roles" ("users_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4a08d003e00caf075a4a212d23" ON "user_roles" ("roles_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "roles_permissions" ("roles_id" integer NOT NULL, "permissions_id" integer NOT NULL, CONSTRAINT "PK_6e2ca75915d98ce434b2b40abb2" PRIMARY KEY ("roles_id", "permissions_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9f90c4016cfda36339727cf606" ON "roles_permissions" ("roles_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_41b3afc511193728bf544e2617" ON "roles_permissions" ("permissions_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_8e1215206acb19f1c38dbda9091" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_4a08d003e00caf075a4a212d23d" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_9f90c4016cfda36339727cf6061" FOREIGN KEY ("roles_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_41b3afc511193728bf544e26171" FOREIGN KEY ("permissions_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_41b3afc511193728bf544e26171"`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_9f90c4016cfda36339727cf6061"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_4a08d003e00caf075a4a212d23d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_8e1215206acb19f1c38dbda9091"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_41b3afc511193728bf544e2617"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9f90c4016cfda36339727cf606"`,
    );
    await queryRunner.query(`DROP TABLE "roles_permissions"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4a08d003e00caf075a4a212d23"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8e1215206acb19f1c38dbda909"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles"`);
    await queryRunner.query(`DROP TABLE "permissions"`);
    await queryRunner.query(`DROP TABLE "roles"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
