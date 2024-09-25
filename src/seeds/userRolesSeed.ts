import { User } from "../entity/User";

import { hashPassword } from "../utils/encrypter";

import { roleRepository } from "../service/role";
import { userRepository } from "../service/user";

export async function userRolesSeed() {
  const adminRole = await roleRepository.findOne({ where: { name: "admin" } });
  const userRole = await roleRepository.findOne({ where: { name: "user" } });
  if (!adminRole || !userRole) {
    throw new Error("role doesnt exist");
  }

  // creating permissions
  const user = new User();
  user.name="admin";
  user.email = "superadmin@gmail.com";
  user.password = await hashPassword("SuperAdmin@1*");
  user.roles = [adminRole];
  await userRepository.save(user);

  const user1 = new User();
  user1.name="user";
  user1.email = "user@gmail.com";
  user1.password = await hashPassword("User12@1*");
  user1.roles = [userRole];
  await userRepository.save(user1);

}

userRolesSeed;
