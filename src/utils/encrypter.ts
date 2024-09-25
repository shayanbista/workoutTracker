import bcryptjs from "bcryptjs";

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(saltRounds);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcryptjs.compare(password, hash);
};
