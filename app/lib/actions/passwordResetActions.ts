"use server";

/**
 * Password Reset Service
 * Updates a user's password in the database with a securely hashed version
 */
import { saltAndHashPassword } from "./authActions";
import { prisma } from "@/prisma/prisma";

/**
 * Resets a user's password with a new hashed password
 * @param {string} email - User's email address for identification
 * @param {string} newPassword - New plain text password to be hashed and stored
 * @returns {Promise<void>} - No return value, modifies database directly
 */
export const resetUserPassword = async (email: string, newPassword: string) => {
  // Generate secure hash of the new password
  const hashedPassword = await saltAndHashPassword(newPassword);

  // Update user record with new password hash
  try {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Close database connection after operation completes
    await prisma.$disconnect();
  } catch (error) {
    // Log error for debugging but preserve user privacy
    console.log(`Error while resetting password: ${error}`);
    return;
  }
};
