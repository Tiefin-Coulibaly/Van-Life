import { model, models } from "mongoose";
import { BookingSchema } from "../schemas/bookingSchema";
import { IBooking } from "@/types/booking";

export const BookingModel = models.Booking || model<IBooking>("Booking", BookingSchema);
