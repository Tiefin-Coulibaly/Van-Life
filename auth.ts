import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./app/lib/actions/authActions";
import { boolean, ZodError } from "zod";
import { signInSchema } from "./app/lib/utils/zod";
import Google from "next-auth/providers/google";
import { findUserByEmail } from "./app/lib/actions/authActions";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma/prisma";
import type { Adapter } from "next-auth/adapters";
import { User } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { encode } from "next-auth/jwt";

const adapter = PrismaAdapter(prisma) as Adapter;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: adapter,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        try {
          // validate user input with zod
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email, password);

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          console.log("User logged in successfully");
          console.log("Returning user from authorize:", user);
          return {
            id: user.id,
            email: user.email,
            name: user.name || null,
            image: user.image || null,
            // custom fields
            firstName: user.firstName || null,
            lastName: user.lastName || null,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication Error:", error);
          if (error instanceof ZodError) {
            console.log("Input validation failed:", error.errors);
          }
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {

      

      if (user) {
        token.sub = user.id as string;
        token.email = user.email;
        token.name = user.name;
        token.firstName = user.firstName as string;
        token.lastName = user.lastName as string;
        token.role = user.role;
      }

      if (account) {
        token.provider = account.provider;
        console.log(`Setting token provider from account: ${account.provider}`);
      } else if (!token.provider) {
        token.provider = "unknown";
        console.log("Setting default provider: unknown");
      }

      if (user && account?.provider === "credentials") {
        token.credentials = true;
      }

      console.log("JWT callback - Token:", {
        sub: token.sub,
        provider: token.provider,
      });

      return token;
    },

    // define the session object
    async session({ session, user, token }) {
      if (!token) {
        return session;
      }

      try {
        // Find the account that was just created
        const newAccount = await prisma.account.findFirst({
          where: {
            userId: token.sub,
            provider: "google",
          },
          orderBy: { createdAt: "desc" },
        });

        if (newAccount) {
          await prisma.account.update({
            where: { id: newAccount.id },
            data: { userId: token.sub },
          });

          console.log(`Account linked to user ${token.linkUserId}`);
        }
      } catch (error) {
        console.error("Error linking account in session callback:", error);
      }

      const enhancedSession = {
        ...session,
        user: {
          ...session.user,
          id: token.sub || user?.id,
          email: token.email || user?.email || session.user?.email,
          name: token.name || user?.name || session.user?.name,
          firstName:
            token.firstName || user?.firstName || session.user?.firstName,
          lastName: token.lastName || user?.lastName || session.user?.lastName,
          provider: token.provider || "unknown",
          role: token.role || user?.role || session.user?.role,
        },
      };

      console.log("Session provider set to:", enhancedSession.user.provider);

      return enhancedSession;
    },
  },

  // jwt config
  jwt: {
    encode: async (params) => {
      if (params.token?.credentials) {
        const sessionToken = uuidv4();

        // Throw an error if no user ID
        if (!params.token?.sub) {
          throw new Error("No user ID found in token");
        }

        // create a session in the database
        const createdSession = await adapter?.createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 14 * 24 * 60 * 1000), // 14 days
        });

        // Throw an error if the session creation fails
        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        // return the session ID
        return sessionToken;
      }

      // return the normal params if the user do not
      // log in using credentials
      return encode(params);
    },
  },
  // session config
  session: {
    strategy: "database",
    maxAge: 14 * 24 * 60 * 60, // 14 days in seconds
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
