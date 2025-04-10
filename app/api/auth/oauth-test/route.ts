import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    googleId: process.env.AUTH_GOOGLE_ID?.substring(0, 5) + "...",
    googleSecret: process.env.AUTH_GOOGLE_SECRET ? "Present" : "Missing",
    authSecret: process.env.AUTH_SECRET ? "Present" : "Missing",
    baseUrl: process.env.NEXTAUTH_URL || "Not set"
  });
}