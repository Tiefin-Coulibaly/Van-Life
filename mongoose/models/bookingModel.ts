import { model } from "mongoose";
import { BookingSchema } from "../schemas/bookingSchema";
import { IBooking } from "@/types/booking";

export const BookingModel = model<IBooking>("Booking", BookingSchema);
