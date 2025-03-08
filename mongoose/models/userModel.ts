import { IUser } from "@/types/user";
import { model, models } from "mongoose";
import { UserSchema } from "../schemas/userSchema";

export const UserModel = models.User || model<IUser>("User", UserSchema)