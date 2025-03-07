import { Document, Types } from "mongoose";

export interface IBooking extends Document {
  vanId: Types.ObjectId;
  renterId: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: "pending" | "confirmed" | "canceled";
  totalPrice: number;
}
