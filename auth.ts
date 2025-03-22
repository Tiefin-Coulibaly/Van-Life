import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./app/lib/utils/authentication";
import { boolean, ZodError } from "zod";
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
        rememberMe: {},
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

          // Add rememberMe to the user object so we can access it in callbacks
          if (credentials.rememberMe) {
            (user as any).rememberMe = credentials.rememberMe;
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
    error: "/auth/error",
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
          const existingUser = await findUserByEmail(user.email as string);

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

    async session({ session, token, user }) {
      // Check if token has expired
      if (token.error === "TokenExpired") {
        // Return an empty session or one with an error flag
        return  {
          ...session,
          expires: new Date(0).toISOString(), // Set to past date
        };
      }

      return {
        ...session,
        user: {
          id: token.id as string,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          email: token.email as string,
          role: token.role as string,
        },
      };
    },

    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id || user._id?.toString();

        if (account?.provider === "google") {
          const dbUser = await findUserByEmail(user.email as string);
          token.role = dbUser.role;
          token.email = dbUser.email;
          token.firstName = dbUser.firstName;
          token.lastName = dbUser.lastName;
        } else {
          console.log(user);
          token.role = user?.role;
          token.email = user?.email as string | undefined;
          token.firstName = user?.firstName;
          token.lastName = user?.lastName;

          console.log("RememberMe type:", typeof user?.rememberMe);
          console.log("RememberMe value:", user?.rememberMe);

          // Set a custom expiry time based on rememberMe status
          token.sessionExpiry =
            typeof user?.rememberMe === "string" && (user?.rememberMe as string).toLowerCase() === "true"
              ? Date.now() + 14 * 24 * 60 * 60 * 1000
              : Date.now() + 10 * 1000; // 10 seconds for testing
        }
        console.log(
          "Set session expiry to:",
          token.sessionExpiry,
          "which is",
          new Date(token.sessionExpiry as any).toString(),
        );

        // Check if session should be expired based on custom expiry
        if (
          typeof token.sessionExpiry === "number" &&
          Date.now() > token.sessionExpiry
        ) {
          // Return an empty object to force sign out
          token.error = "TokenExpired";
        }
      }

      console.log("FINAL TOKEN:", token);
      return token;
    },
  },
  session: {
    strategy: "jwt",

    // Max session lifetime in seconds
    maxAge: 14 * 24 * 60 * 60, //14 days
  },
});
