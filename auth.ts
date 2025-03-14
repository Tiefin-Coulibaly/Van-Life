import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "./app/lib/utils/password";
import { ZodError } from "zod";
import { signInSchema } from "./app/lib/utils/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await getUserFromDb(email, password);

          if (!user) {
            throw new Error("Invalid credentials"); // 
          }
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            console.log(error);
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
});
