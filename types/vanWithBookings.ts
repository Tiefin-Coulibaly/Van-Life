import { Van, Booking } from "@prisma/client";

export interface IVanWithBookings extends Van {
  bookings: Booking[];
}
