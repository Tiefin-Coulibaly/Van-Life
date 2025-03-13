"use server";

import { UserRegistration } from "@/types/userRegistrationForm";
import { UserModel } from "@/mongoose/models/userModel";
import { saltAndHashPassword } from "./utils/password";

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

    // format the data
    for (let key in userData) {
      if (key === "email") {
        userData[key] = userData[key].toLowerCase();
      } else if (key === "firstName" || key === "lastName") {
        userData[key] =
          userData[key].charAt(0).toUpperCase() +
          userData[key].slice(1).toLowerCase();
      } else if (key === "password") {
        const hashedPassword = await saltAndHashPassword(userData[key]);
        userData[key] = hashedPassword;
      }
    }
    console.log(userData);

    const newUser = await new UserModel(userData);
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
