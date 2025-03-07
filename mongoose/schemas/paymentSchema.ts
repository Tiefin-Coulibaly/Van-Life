import { Schema } from "mongoose";
import { IPayment } from "@/types/payment";

export const PaymentSchema = new Schema<IPayment>({
  bookingId: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
    required: [true, "Booking ID is required"],
  },
  renterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Renter ID is required"],
  },
  amount: {
    type: Number,
    required: [true, "Payment amount is required"],
    min: [0, "Payment amount must be a positive number"],
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "completed", "failed"],
      message: "Status must be 'pending', 'completed', or 'failed'",
    },
    required: [true, "Payment status is required"],
  },
  method: {
    type: String,
    enum: {
      values: ["credit_card", "paypal"],
      message: "Payment method must be 'credit_card' or 'paypal'",
    },
    required: [true, "Payment method is required"],
  },
  date: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (value: Date) {
        return value == new Date();
      },
      message: "Payment date cannot be in the past or the future",
    },
  },
});
