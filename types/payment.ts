import { Types, Document } from "mongoose";

export interface IPayment extends Document {
  bookingId: Types.ObjectId;
  renterId: Types.ObjectId;
  amount: number;
  status: "pending" | "completed" | "failed";
  method: "credit_card" | "paypal";
  date: Date;
}
