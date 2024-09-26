import { AppDataSource } from "../dataSource";
import { Role } from "../entity/Role";

export const roleRepository = AppDataSource.getRepository(Role);

import loggerWithNameSpace from "../utils/logger";

const roleLogger = loggerWithNameSpace("roleServiceLogger");

const findByName = async (name: string) => {
  roleLogger.info(`Searching for role: ${name}`);
  return await roleRepository.findOne({
    where: {
      name,
    },
  });
};

const getPermissions = async (name: string) => {
  roleLogger.info(`Searching for role: ${name}`);
  return await roleRepository.findOne({
    where: {
      name,
    },
  });
};

export const getRole = async (roleName: string) => {
  roleLogger.info(`Searching for name: ${roleName}`);
  const role = await findByName(roleName);
  return role;
};

export const getRolePermissions = async (roleName: string) => {
  roleLogger.info(`Searching for name: ${roleName}`);
  const role = await findByName(roleName);
  return role;
};
