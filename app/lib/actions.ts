"use server";

import { UserRegistration } from "@/types/userRegistrationForm";
import { UserModel } from "@/mongoose/models/userModel";
import { saltAndHashPassword } from "./utils/password";
import { signIn } from "@/auth";
import { runMongoConnection } from "./connectDB";
import { redirect } from "next/navigation";

// connect to db
runMongoConnection();

export const createUser = async (
  userData: UserRegistration,
): Promise<{ success: boolean; message: string }> => {
  try {
    const existingUser = await UserModel.findOne({ email: userData.email });

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

    const newUser = new UserModel(userData);
    await newUser.save(); // Ensure save is awaited

    return { success: true, message: "User created successfully!" };
  } catch (error) {
    console.error(`Error inserting: ${error.message}`);
    return {
      success: false,
      message: `Something went wrong. We are working on solving the issue. Please try again later`,
    };
  }
};

export const signUserIn = async (formData: FormData) => {
  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirectTo: "/dashboard",
  });
};
