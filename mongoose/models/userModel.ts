import { IUser } from "@/types/user";
import { model } from "mongoose";
import { UserSchema } from "../schemas/userSchema";

export const UserModel = model<IUser>("user", UserSchema)