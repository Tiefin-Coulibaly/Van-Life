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
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
    Google,
  ],
  // callbacks: {
  //   async signIn({ user, account }) {
  //     // allow sign in when using the credentials provider
  //     if (account?.provider === "credentials") {
  //       return true;
  //     }

  //     // verify the existence of the user in the db before
  //     // allowing him to sign in when the provider is google
  //     if (account?.provider === "google") {
  //       const foundUser = findUserByEmail(user?.email as string);
  //       console.log("Found user", foundUser);
  //       if (!foundUser) {
  //         return false;
  //       }
  //       return true;
  //     }

  //     // Catch-all fallback for other providers
  //     return false;
  //   },
  // },
  session: {
    strategy: "database",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  },
  pages:{
    signIn:"/auth/signin",
    newUser:"/auth/newUser"
  }
});
