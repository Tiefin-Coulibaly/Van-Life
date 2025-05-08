import { Booking, Van } from "@prisma/client";

export type BookingStatusCount = {
  pending: number;
  completed: number;
  canceled: number;
};

export type BookingStats = {
  totalBookings?: number;
  totalAmount?: number;
  sortedBookings?: Booking[];
  bookingTrend?: string;
  isBookingUp?: boolean;
  revenueTrend?: string;
  isRevenueUp?: boolean;
  currentMonthExpenses?: number;
  previousMonthExpenses?: number;
  bookingStatusCount?: BookingStatusCount;
  revenueStatusCount?: BookingStatusCount;
};
export interface BookingWithVan extends Booking {
  van: Van;
}
