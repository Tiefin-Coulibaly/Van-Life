import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedPathsPrefix = ["/dashboard", "/payment"];
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const session = await auth();
  const isProtectedPath = protectedPathsPrefix.some((path) =>
    pathname.startsWith(path),
  );

  if (isProtectedPath && !session?.user) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
