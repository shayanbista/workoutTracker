import { User } from "../entity/User";
// import { hashPassword } from "../utils/encrypter";
import * as roleService from "./role";
import { AppDataSource } from "../dataSource";
import { Role } from "../entity/Role";
import { BadRequestError } from "../error/BadRequestError";
import { hashPassword } from "../utils/encrypter";
import { NotFoundError } from "../error/NotFoundError";

export const userRepository = AppDataSource.getRepository(User);



export const findByEmail = async (email: string) => {
  return userRepository.findOneBy({ email });
};


// export const findByEmailAndPassword=async (email: string,password:string) => {
//   console.log("userEmail",email);
//   console.log("userPassword",pass)
//   return userRepository.findOneBy({ email,password});
// };


export const create = async (
  email: string,
  password: string,
  roles: Role,
  name: string,
) => {
  const newUser = new User();
  newUser.name=name;
  newUser.email = email;
  newUser.password = password;
  newUser.roles = [roles];

  await userRepository.save(newUser);
  return newUser;
};


export const createUser = async (
  email: string,
  password: string,
  role: string,
  name: string,
) => {
  const existingUser = await findByEmail(email);
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }
  const newPassword = await hashPassword(password);
  const roleExists = await roleService.getRole(role);
  if (!roleExists) throw new NotFoundError("Role not found");

  const newUser = await create(
    email,
    newPassword,
    roleExists,
    name,
  );
  return newUser;
};


