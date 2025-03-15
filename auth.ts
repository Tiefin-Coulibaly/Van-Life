import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./app/lib/utils/authentication";
import { ZodError } from "zod";
import { signInSchema } from "./app/lib/utils/zod";
import { IUser } from "./types/user";
import Google from "next-auth/providers/google";
import { findUserByEmail } from "./app/lib/utils/authentication";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user: IUser | null = null;
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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error:"/auth/error"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") {
        return true;
      }

      // For Google provider, verify if the user exists in your database
      if (account?.provider === "google") {
        try {
          // Check if user exists in the database by email
          const existingUser = await findUserByEmail(user.email);

          if (existingUser) {
            // User exists, allow sign-in
            return true;
          } else {
            return "/auth/error?error=User not found";
          }
        } catch (error) {
          console.error("Error verifying Google user:", error);
          return `/auth/error?error=${error}`;
        }
      }

      // Default case for unhandled providers
      return "/auth/error?error=Unsupported provider";
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  }
});
