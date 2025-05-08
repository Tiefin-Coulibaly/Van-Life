import { IBooking } from "@/types/bookingTypes";
import { Schema } from "mongoose";

export const BookingSchema: Schema = new Schema<IBooking>({
  vanId: {
    type: Schema.Types.ObjectId,
    ref: "Van",
    required: [true, "Van ID is required"],
    trim: true,
  },
  renterId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Renter ID is required"],
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
    validate: {
      validator: function (value: Date) {
        return value > new Date();
      },
      message: "Start date must be in the future",
    },
  },
  endDate: {
    type: Date,
    required: [true, "End date is required"],
    validate: {
      validator: function (value: Date) {
        return this.startDate ? value > this.startDate : true;
      },
      message: "End date must be after the start date",
    },
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "confirmed", "canceled"],
      message: "Status must be 'pending', 'confirmed', or 'canceled'",
    },
    required: [true, "Booking status is required"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required"],
    min: [0, "Total price cannot be negative"],
  },
});
