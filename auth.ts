import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./app/lib/utils/password";
import { ZodError } from "zod";
import { signInSchema } from "./app/lib/utils/zod";
import { IUser } from "./types/user";

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
  ],
  pages: {
    signIn: "/auth/signin", // Specify your sign-in page
    // signOut: "/logout", // Optional
    // error: "/error"
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
