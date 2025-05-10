import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Use patterns instead of exact matches
const PUBLIC_PATH_PREFIXES = ["/", "/vans", "/auth/signin", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow requests to static files or Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(.*)$/) // Exclude all static assets (e.g., .png, .css, .js)
  ) {
    return NextResponse.next();
  }

  // Allow requests to public paths (prefix match)
  if (
    PUBLIC_PATH_PREFIXES.some(
      (path) => pathname === path || pathname.startsWith(path + "/"),
    )
  ) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"], 
};
