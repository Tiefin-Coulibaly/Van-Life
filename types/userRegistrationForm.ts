import { IUser } from "./user";

export type UserRegistration = Omit<IUser, keyof Document>