import { Booking } from "@prisma/client";

export type BookingStatusCount = {
  pending: number;
  completed: number;
  canceled: number;
};

export type BookingStats = {
  totalBookings?: number;
  totalAmount?: number;
  bookingTrend?: string;
  isBookingUp?: boolean;
  revenueTrend?: string;
  isRevenueUp?: boolean;
  currentMonthExpenses?: number;
  previousMonthExpenses?: number;
  bookingStatusCount?: BookingStatusCount;
  revenueStatusCount?: BookingStatusCount;
};
