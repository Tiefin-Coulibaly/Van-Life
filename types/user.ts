
import { User, Booking, Payment, Review, Van, Notification  } from "@prisma/client";
import { BookingWithVan } from "./bookingTypes";
import { ReviewWithVan } from "./review";

export interface VanWithReviews extends Van {
  reviews: Review[];
}

export interface PaymentWithBooking extends Payment {
  booking: Booking;}
export interface UserDataResponse {
  id: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  bookings: BookingWithVan[];
  payments: PaymentWithBooking[];
  notifications: Notification[];
  reviews: ReviewWithVan[];
  vansRented: VanWithReviews[];
}

export type FetchUserDataResult = UserDataResponse | null;