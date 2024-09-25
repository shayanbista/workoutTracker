import { AppDataSource } from "../dataSource";
import { categoryServicesSeed } from "./categorySeed";
import { rolesPermissionseed } from "./rolesPermisiionsSeed";
import { userRolesSeed } from "./userRolesSeed";

async function main() {
  try {
    await AppDataSource.initialize();
    const seedName = "initial_seed";
    const seedLogCheckQuery = `SELECT * FROM seed_log WHERE seed_name = $1`;
    const seedLogInsertQuery = `INSERT INTO seed_log (seed_name) VALUES ($1)`;

    const seedLog = await AppDataSource.query(seedLogCheckQuery, [seedName]);

    if (seedLog.length > 0) {
      console.log("Seeding has already been completed.");
      return;
    }

    await AppDataSource.query(seedLogInsertQuery, [seedName]);

    await rolesPermissionseed();
    await userRolesSeed();
    await categoryServicesSeed();
    console.log("seeding successful ");
  } catch (err) {
    console.log("err", err);
  }
}

main();
