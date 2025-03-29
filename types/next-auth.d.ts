import NextAuth, { type DefaultSession, type DefaultUser } from "next-auth"

declare module "next-auth" {
 
  interface Session {
    user:User & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    firstName:string
    lastName:string
    role:"Renter" | "Owner" | "Admin"
  }
}
