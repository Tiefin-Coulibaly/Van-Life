import bcrypt from "bcryptjs";
import { UserModel } from "@/mongoose/models/userModel";
import { IUser } from "@/types/user";
import { runMongoConnection } from "./connectDB";
import { prisma } from "../../../prisma/prisma";
import { User } from "@prisma/client";

// hash users password
export const saltAndHashPassword = async (
  userPassword: string,
): Promise<string> => {
  console.log("Original Password:", userPassword);
  const pwdHash = await bcrypt.hash(userPassword, 10);
  console.log("Hashed Password:", pwdHash);
  return pwdHash;
};

// Get a user form teh db
export const getUserFromDb = async (
  userEmail: string,
  userPassword: string,
) => {
  try {
    console.log(`email: ${userEmail}`);
    console.log(`password: ${userPassword}`);

    // try to find the user in the db
    const user: User | null = await prisma.user.findUnique({
      where: { email: userEmail.toLowerCase() },
    });

    // if no user found, return  null
    if (!user) {
      return null;
    }

    // verify if the user is registered
    const isUserRegistered = await bcrypt.compare(userPassword, user.password);

    await prisma.$disconnect();
    return isUserRegistered ? user : null;
  } catch (error) {
    console.log(`error getting the user: ${error}`);
    await prisma.$disconnect();
    return null;
  }
};

// find a user by its email
export const findUserByEmail = async (userEmail: string) => {
  const user: User | null = await prisma.user.findUnique({
    where: { email: userEmail.toLowerCase() },
  });
  await prisma.$disconnect();
  return user;
};
