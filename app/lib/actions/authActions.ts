"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "../../../prisma/prisma";
import { Prisma } from "@prisma/client";
import { IGoogleNewUser } from "@/types/googleNewUser";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";
import { ISignIn } from "@/types/signIn";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

// Create  a new user
export const createUser = async (
  userData: Prisma.UserCreateInput,
): Promise<{ success: boolean; message: string }> => {
  try {
    // verify is the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Please use a different email.",
      };
    }

    // Format fields properly
    userData.email = userData.email.toLowerCase();
    if (userData.firstName) {
      userData.firstName =
        userData.firstName.charAt(0).toUpperCase() +
        userData.firstName.slice(1).toLowerCase();
    }

    if (userData.lastName) {
      userData.lastName =
        userData.lastName.charAt(0).toUpperCase() +
        userData.lastName.slice(1).toLowerCase();
    }

    // Explicitly hash password before saving
    userData.password = await saltAndHashPassword(userData?.password as string);

    // Create a new user
    const newUser = await prisma.user.create({ data: userData });

    // Create an account record for this user
    await prisma.account.create({
      data: {
        userId: newUser.id,
        type: "credentials",
        provider: "credentials",
        providerAccountId: uuidv4(),
      },
    });

    return { success: true, message: "User created successfully!" };
  } catch (error) {
    console.error(`Error inserting: ${error.message}`);
    return {
      success: false,
      message: `Something went wrong. We are working on solving the issue. Please try again later`,
    };
  }
};

// hash users password
export const saltAndHashPassword = async (
  userPassword: string,
): Promise<string> => {
  console.log("Original Password:", userPassword);
  const pwdHash = await bcrypt.hash(userPassword, 10);
  console.log("Hashed Password:", pwdHash);
  return pwdHash;
};

// Get a user form the db
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
    const isUserRegistered = await bcrypt.compare(
      userPassword,
      user?.password as string,
    );

    await prisma.$disconnect();
    return isUserRegistered ? user : null;
  } catch (error) {
    console.log(`error getting the user: ${error}`);
    await prisma.$disconnect();
    return null;
  }
};

// find a user by its email
export const findUserByEmail = async (
  userEmail: string,
): Promise<User | { success: false; message: string }> => {
  const user: User | null = await prisma.user.findUnique({
    where: { email: userEmail.toLowerCase() },
  });

  if (!user) {
    return {
      success: false,
      message: "No user found. Please enter a valid email.",
    };
  }
  await prisma.$disconnect();
  return user;
};

// Handle user sign in with credentials
export const signUserInWithCredentials = async (formData: ISignIn) => {
  try {
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });
    revalidatePath("/", "layout");
    return { success: true, redirectTo: "/dashboard" };
  } catch (error) {
    console.error("Credentials Authentication error:", error.type);
    // console.log(error.Error)
    return error.type === "CredentialsSignin"
      ? {
          error:
            "Invalid credentials. Please try again. If you signed up with your Google account, sign in using Google. You can set up email and password login later in your account settings.",
        }
      : {
          error:
            "An unexpected error occurred. We are currently working on it. Please try again later",
        };
  }
};

// handle user sign in with google
export const signUserInWithGoogle = async () => {
  await signIn("google", { redirectTo: "/dashboard" });
  revalidatePath("/", "layout");
};

// Update the user information after signin up with google
export const updateGoogleAuthNewUserData = async (
  userEmail: string,
  userData: IGoogleNewUser,
) => {
  await prisma.user.update({ where: { email: userEmail }, data: userData });

  await prisma.$disconnect();
};

// Handle user sign out
export const signUserOUt = async () => {
  await signOut({redirectTo: "/auth/signin"});
};
