import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  
  return NextResponse.json({
    message: "Auth debug endpoint",
    env: {
      googleId: process.env.AUTH_GOOGLE_ID ? "Set" : "Not Set",
      googleSecret: process.env.AUTH_GOOGLE_SECRET ? "Set" : "Not Set",
      authSecret: process.env.AUTH_SECRET ? "Set" : "Not Set"
    },
    params
  });
}