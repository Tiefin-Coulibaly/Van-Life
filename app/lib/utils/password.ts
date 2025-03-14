import bcrypt from "bcryptjs";
import { UserModel } from "@/mongoose/models/userModel";
import { IUser } from "@/types/user";
import { signIn } from "@/auth";

export const saltAndHashPassword = async (
  userPassword: string,
): Promise<string> => {
  const pwdHash = await bcrypt.hash(userPassword, 10);
  return pwdHash;
};

export const getUserFromDb = async (
  userEmail: string,
  userPassword: string,
) => {
  try {
    const user: IUser | null = await UserModel.findOne({
      email: userEmail.toLowerCase(),
    });

    if (!user) {
      return null;
    }

    const isUserRegistered = await bcrypt.compare(userPassword, user.password);

    return isUserRegistered ? user : null;
  } catch (error) {
    console.log(`error getting the user: ${error}`);
    return null;
  }
};
