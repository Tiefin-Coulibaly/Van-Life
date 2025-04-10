"use server";

import { processAccountLinking } from "./accountService";

export async function processAccountLinkingForClient(
  provider: string,
  providerAccountId: string,
  userId: string,
) {
  try {
    const providerData = {
      provider,
      providerAccountId,
      userId
    };
    
    const result = await processAccountLinking(providerData);
    return { success: true, message: "Account linked successfully" };
  } catch (error) {
    console.error("Error in processAccountLinkingForClient:", error);
    return { 
      success: false, 
      message: error.message || "Failed to link account" 
    };
  }
}