import bcrypt from "bcryptjs";
import { UserModel } from "@/mongoose/models/userModel";
import { IUser } from "@/types/user";
import { runMongoConnection } from "../connectDB";

// connect to db
runMongoConnection();

export const saltAndHashPassword = async (
  userPassword: string,
): Promise<string> => {
  console.log("Original Password:", userPassword);
  const pwdHash = await bcrypt.hash(userPassword, 10);
  console.log("Hashed Password:", pwdHash);
  return pwdHash;
};

export const getUserFromDb = async (
  userEmail: string,
  userPassword: string,
) => {
  try {
    console.log(`email: ${userEmail}`);
    console.log(`password: ${userPassword}`);

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
