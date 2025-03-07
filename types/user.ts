import { Document, Types } from "mongoose";

export interface IUser extends Document {
    fullName:string,
    email:string,
    password:string,
    role: "renter" | "owner" | "admin",
    phone?: string,
    profilePic?:string,
    vansOwned?: Types.ObjectId[]
    bookings?: Types.ObjectId[]
}