import { IUser } from "@/types/user";
import { Schema } from "mongoose";

export const UserSchema: Schema = new Schema<IUser>({
  fullName: { type: String, required: [true, "Full name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    lowercase: true,
    trim: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
    enum: {
      values: ["renter", "owner", "admin"],
      message: "Role must be either 'renter', 'owner', or 'admin'",
    },
    trim: true,
    lowercase: true,
  },
  phone: { type: String, trim: true, default: "" },
  profilePic: { type: String, default: "" },
  vansOwned: {
    type: [Schema.Types.ObjectId],
    ref: "vans",
    default: [],
  },
  bookings: {
    type: [Schema.Types.ObjectId],
    ref: "bookings",
    default: [],
  },
});
