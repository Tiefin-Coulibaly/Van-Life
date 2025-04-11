import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    provider?:string
    role: any;
  }
}


declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    provider?: string;
    firstName?: string;
    lastName?: string;
    role?: Role;
    credentials?: boolean;
  }
}