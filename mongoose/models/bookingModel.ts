import { model, models } from "mongoose";
import { BookingSchema } from "../schemas/bookingSchema";
import { IBooking } from "@/types/bookingTypes";

export const BookingModel = models.Booking || model<IBooking>("Booking", BookingSchema);
