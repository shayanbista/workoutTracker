import { Role } from "../entity/Role";
import { Permission } from "../entity/Permission";
import { AppDataSource } from "../dataSource";

const permissionRepo = AppDataSource.getRepository(Permission);
const roleRepo = AppDataSource.getRepository(Role);

export async function rolesPermissionseed() {
  // creating permissions
  const userPostPermission = new Permission();
  userPostPermission.name = "users.post";

  const userDeletePermission = new Permission();
  userDeletePermission.name = "users.delete";

  const userGetPermission = new Permission();
  userGetPermission.name = "users.get";

  const userPutPermission = new Permission();
  userPutPermission.name = "users.put";

  const workoutPostPermission = new Permission();
  workoutPostPermission.name = "workouts.post";

  const workoutGetPermission = new Permission();
  workoutGetPermission.name = "workouts.get";

  const workoutPutPermission = new Permission();
  workoutPutPermission.name = "workouts.put";

  const workoutDeletePermission = new Permission();
  workoutDeletePermission.name = "workouts.delete";

  const reportPermission = new Permission();
  reportPermission.name = "reports.get";

  const exerciseAddPermission = new Permission();
  exerciseAddPermission.name = "exercises.add";

  const exerciseGetPermission = new Permission();
  exerciseGetPermission.name = "exercises.get";

  const exerciseDeletePermission = new Permission();
  exerciseDeletePermission.name = "exercises.delete";

  await permissionRepo.save([
    userPostPermission,
    userDeletePermission,
    userGetPermission,
    userPutPermission,
    workoutPostPermission,
    workoutGetPermission,
    reportPermission,
    exerciseAddPermission,
    exerciseGetPermission,
    exerciseDeletePermission,
  ]);

  // creating their relation
  const userRole = new Role();
  userRole.name = "user";
  userRole.permissions = [
    userPostPermission,
    userDeletePermission,
    userGetPermission,
    userPutPermission,
    workoutPostPermission,
    workoutDeletePermission,
    workoutGetPermission,
    reportPermission,
    exerciseGetPermission,
  ];

  const adminRole = new Role();
  adminRole.name = "admin";
  adminRole.permissions = [
    userDeletePermission,
    userGetPermission,
    workoutGetPermission,
    workoutPutPermission,
    workoutDeletePermission,
    exerciseAddPermission,
    exerciseGetPermission,
    exerciseDeletePermission,
  ];

  await roleRepo.save([userRole, adminRole]);
}
