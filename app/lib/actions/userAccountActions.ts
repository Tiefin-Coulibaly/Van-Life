"use server"

import { getLinkedProviders, unlinkAccount } from "./accountService";

// Safe wrapper for client components
export const  getLinkedProvidersForClient = async () => {
  try {
    const providers = await getLinkedProviders();
    return providers;
  } catch (error) {
    console.error("Error in getLinkedProvidersForClient:", error);
    return [];
  }
}

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