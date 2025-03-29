import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./app/lib/utils/authentication";
import { boolean, ZodError } from "zod";
import { signInSchema } from "./app/lib/utils/zod";
import Google from "next-auth/providers/google";
import { findUserByEmail } from "./app/lib/utils/authentication";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";
import type { Adapter } from "next-auth/adapters";
import { User } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        rememberMe: {},
      },
      authorize: async (credentials) => {
        try {
          let user: User | null = null;

          // validate user input with zod
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          user = await getUserFromDb(email, password);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          console.log("User logged in successfully");
          return user;
        } catch (error) {
          console.error("Authentication Error:", error);
          if (error instanceof ZodError) {
            console.log("Input validation failed:", error.errors);
          }
          return null;
        }
      },
    }),
    Google,
  ],
  callbacks: {
    // define the session object
    async session({ session, user }) {
      if (user) {
        return {
          ...session,
          user: {
            ...session.user,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          },
        };
      }

      return session;
    },
  },
  // session config
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  },
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/newUser",
  },
});
