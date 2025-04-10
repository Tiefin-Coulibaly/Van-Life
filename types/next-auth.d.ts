import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    firstName?: string | null;
    lastName?: string | null;
    role: any;
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    credentials?: boolean
    sub?: string
  }
}