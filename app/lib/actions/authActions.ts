"use server";

import { UserRegistration } from "@/types/userRegistrationForm";
import { UserModel } from "@/mongoose/models/userModel";
import { saltAndHashPassword } from "../utils/authentication";
import { signIn } from "@/auth";
import { runMongoConnection } from "../utils/connectDB";
import { prisma } from "../../../prisma/prisma";
import { Prisma } from "@prisma/client";
import { IGoogleNewUser } from "@/types/googleNewUser";

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
    userData.firstName =
      userData.firstName.charAt(0).toUpperCase() +
      userData.firstName.slice(1).toLowerCase();
    userData.lastName =
      userData.lastName.charAt(0).toUpperCase() +
      userData.lastName.slice(1).toLowerCase();

    // Explicitly hash password before saving
    userData.password = await saltAndHashPassword(userData.password);

    // Create a new user
    await prisma.user.create({
      data: userData,
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

export const signUserInWithCredentials = async (formData: FormData) => {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      rememberMe: formData.has("rememberMe"),
      redirect: false,
    });

    // If successful, redirect manually
    return { success: true, redirectTo: "/dashboard" };
  } catch (error) {
    console.error("Credentials Authentication error:", error.type);
    // console.log(error.Error)
    return error.type === "CredentialsSignin"
      ? { error: "Invalid Credentials. Please try again." }
      : {
          error:
            "An unexpected error occurred. We are currently working on it. Please try again later",
        };
  }
};

export const signUserInWithGoogle = async () => {
  await signIn("google", {
    redirectTo: "/dashboard",
  });
};

// Update the user information after signin up with google
export const updateGoogleAuthNewUserData = async (
  userEmail: string,
  userData: IGoogleNewUser,
) => {
  await prisma.user.update({
    where: { email: userEmail },
    data: userData,
  });

  await prisma.$disconnect()
};
