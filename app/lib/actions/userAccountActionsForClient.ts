"use server";

import { getLinkedProviders, unlinkAccount } from "./userAccountsActions";
import { auth } from "@/auth";
import { prisma } from "@/prisma/prisma";
import { saltAndHashPassword } from "./authActions";
import { v4 as uuidv4 } from "uuid";

// Safe wrapper for client components
export const getLinkedProvidersForClient = async () => {
  try {
    const providers = await getLinkedProviders();
    return providers;
  } catch (error) {
    console.error("Error in getLinkedProvidersForClient:", error);
    return [];
  }
};

// Safe wrapper for unlinking accounts
export async function unlinkAccountForClient(provider: string) {
  try {
    const result = await unlinkAccount(provider);
    return result;
  } catch (error) {
    console.error("Error in unlinkAccountForClient:", error);
    return { success: false, message: "Failed to unlink account" };
  }
}

/**
 * Determines the authentication method used for the current session
 * by examining database records
 */
export async function getCurrentAuthMethod() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      console.log("No user session found");
      return "unknown";
    }

    console.log("Getting auth method for user:", session.user.id);

    // First check: Look for a recent session with matching userId
    const activeSession = await prisma.session.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        expires: "desc",
      },
    });

    if (!activeSession) {
      console.log("No active session found in database");
      return "unknown";
    }

    console.log(
      "Found active session with token:",
      activeSession.sessionToken.substring(0, 8) + "...",
    );

    // Second check: Look at accounts table to see what providers this user has
    const accounts = await prisma.account.findMany({
      where: {
        userId: session.user.id,
      },
    });

    console.log(
      "User has linked accounts:",
      accounts.map((a) => a.provider),
    );

    // For users with only one provider, that must be what they used
    if (accounts.length === 1) {
      console.log(
        "Single account found, auth method is:",
        accounts[0].provider,
      );
      return accounts[0].provider;
    }

    // For users with multiple accounts, we need to use timing heuristics
    // Check if the sessionToken is in UUID format
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        activeSession.sessionToken,
      );

    // Find Google account if it exists
    const googleAccount = accounts.find((acc) => acc.provider === "google");
    const credentialsAccount = accounts.find(
      (acc) => acc.provider === "credentials",
    );

    // Verify accounts exist before attempting the next check
    if (!googleAccount && credentialsAccount) {
      console.log("Only credentials account found");
      return "credentials";
    }

    if (googleAccount && !credentialsAccount) {
      console.log("Only Google account found");
      return "google";
    }

    // If user has both account types, use the UUID check
    if (isUUID) {
      console.log("Session token is UUID format - credentials auth");
      return "credentials";
    } else {
      console.log("Session token is not UUID format - assuming Google auth");
      return "google";
    }
  } catch (error) {
    console.error("Error determining auth method:", error);
    return "unknown";
  }
}

export const setPasswordForUser = async (userId: string, password: string) => {
  try {
    const session = await auth();
    
    // Verify the user is authenticated and is the same user
    if (!session?.user || session.user.id !== userId) {
      throw new Error("Unauthorized");
    }
    
    // Hash the password
    const hashedPassword = await saltAndHashPassword(password);
    
    // Update the user with the new password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });
    
    // Check if the user already has a credentials account
    const existingCredentialsAccount = await prisma.account.findFirst({
      where: {
        userId,
        provider: "credentials"
      }
    });
    
    // If no credentials account exists, create one
    if (!existingCredentialsAccount) {
      await prisma.account.create({
        data: {
          userId,
          type: "credentials",
          provider: "credentials",
          providerAccountId: uuidv4(),
        }
      });
      
      console.log("Created new credentials account for user");
    }
    
    return { success: true, message: "Password set successfully" };
  } catch (error) {
    console.error("Error setting password:", error);
    throw new Error("Failed to set password");
  }
}
