import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      firstName?: string;
      lastName?: string;
      email?: string;
      role?: string;
    } ;
  }

  interface User {
    _id?: string | any; // MongoDB ObjectId
    role?: string;
    firstName: string;
    lastName: string;
    email: string;
    rememberMe?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    rememberMe?: boolean;
    sessionExpiry?: number;
    error?: string;
  }
}
