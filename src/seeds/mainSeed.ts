// import { AppDataSource } from "../dataSource";
// import { exerciseSeed } from "./exercisesSeed";
// import { rolesPermissionseed } from "./rolesPermisiionsSeed";
// import { userRolesSeed } from "./userRolesSeed";

// async function main() {
//   try {
//     await AppDataSource.initialize();
//     const seedName = "initial_seed";
//     const seedLogCheckQuery = `SELECT * FROM seed_log WHERE seed_name = $1`;
//     const seedLogInsertQuery = `INSERT INTO seed_log (seed_name) VALUES ($1)`;

//     const seedLog = await AppDataSource.query(seedLogCheckQuery, [seedName]);

//     if (seedLog.length > 0) {
//       console.log("Seeding has already been completed.");
//       return;
//     }

//     await AppDataSource.query(seedLogInsertQuery, [seedName]);

//     await rolesPermissionseed();
//     await userRolesSeed();
//     await exerciseSeed();
//     console.log("seeding successful ");
//   } catch (err) {
//     console.log("err", err);
//   }
// }

// main();

// import { AppDataSource } from "../dataSource";
// import { exerciseSeed } from "./exercisesSeed";
// import { rolesPermissionseed } from "./rolesPermisiionsSeed";
// import { userRolesSeed } from "./userRolesSeed";

// async function main() {
//   try {
//     await AppDataSource.initialize();
//     const seedName = "initial_seed";
//     const seedLogCheckQuery = `SELECT * FROM seed_log WHERE seed_name = $1`;
//     const seedLogInsertQuery = `INSERT INTO seed_log (seed_name) VALUES ($1)`;

//     const seedLog = await AppDataSource.query(seedLogCheckQuery, [seedName]);

//     if (seedLog.length > 0) {
//       console.log("Seeding has already been completed.");
//       return;
//     }

//     // Check if any relevant tables have data and truncate if necessary
//     const tablesToCheck = ['roles', 'permissions', 'user_roles', 'exercises'];
//     const truncatePromises = tablesToCheck.map(async (table) => {
//       const checkDataQuery = `SELECT COUNT(*) FROM ${table}`;
//       const result = await AppDataSource.query(checkDataQuery);
//       return parseInt(result[0].count) > 0; // Returns true if there are rows in the table
//     });

//     const results = await Promise.all(truncatePromises);
//     if (results.some(hasData => hasData)) {
//       console.log("Truncating tables because they contain existing data.");
//       const truncatePromises = tablesToCheck.map(table => AppDataSource.query(`TRUNCATE TABLE ${table} CASCADE`));
//       await Promise.all(truncatePromises);
//     }

//     await AppDataSource.query(seedLogInsertQuery, [seedName]);

//     await rolesPermissionseed();
//     await userRolesSeed();
//     await exerciseSeed();
//     console.log("Seeding successful ");
//   } catch (err) {
//     console.log("Error:", err);
//   }
// }

// main();

import { AppDataSource } from "../dataSource";
import { exerciseSeed } from "./exercisesSeed";
import { rolesPermissionseed } from "./rolesPermisiionsSeed";
import { userRolesSeed } from "./userRolesSeed";

async function main() {
  try {
    await AppDataSource.initialize();
    const seedName = "initial_seed";
    const seedLogCheckQuery = `SELECT * FROM seed_log WHERE seed_name = $1`;
    const seedLogInsertQuery = `INSERT INTO seed_log (seed_name) VALUES ($1)`;

    const seedLog = await AppDataSource.query(seedLogCheckQuery, [seedName]);

    // Check if seed log exists
    if (seedLog.length > 0) {
      // If seed log exists, check if users table is empty
      const userCountQuery = `SELECT COUNT(*) FROM users`;
      const userCountResult = await AppDataSource.query(userCountQuery);
      const userCount = parseInt(userCountResult[0].count);

      if (userCount === 0) {
        console.log(
          "Users table is empty. Truncating all tables and seeding again.",
        );
        const tablesToTruncate = [
          "roles",
          "permissions",
          "user_roles",
          "exercises",
          "seed_log",
        ];
        const truncatePromises = tablesToTruncate.map((table) =>
          AppDataSource.query(`TRUNCATE TABLE ${table} CASCADE`),
        );
        await Promise.all(truncatePromises);
        await AppDataSource.query(seedLogInsertQuery, [seedName]);
      } else {
        console.log("Seeding has already been completed.");
        return;
      }
    } else {
      // If seed log does not exist, proceed to insert it
      await AppDataSource.query(seedLogInsertQuery, [seedName]);
    }

    // Seed the tables
    await rolesPermissionseed();
    await userRolesSeed();
    await exerciseSeed();
    console.log("Seeding successful ");
  } catch (err) {
    console.log("Error:", err);
  }
}

main();
