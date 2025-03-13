import { Document, Types } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "renter" | "owner" | "admin";
  phone?: string;
  profilePic?: string;
  vansOwned?: Types.ObjectId[];
  bookings?: Types.ObjectId[];
}
