
import bcrypt from "bcryptjs";


export const saltAndHashPassword = async (
  userPassword: string,
): Promise<string> => {
  const pwdHash = await bcrypt.hash(userPassword, 10);
  return pwdHash;
};

