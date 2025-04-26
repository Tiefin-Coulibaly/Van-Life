import { BookingStats } from "@/types/bookingTypes";
import Card from "../Card";
import {
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

const BookingMetrics = ({
  totalBookings,
  bookingTrend,
  isBookingUp,
  bookingStatusCount,
}: BookingStats) => {

  
  return (
    <Card
      className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm"
      content={
        <div>
          <div className="flex items-center justify-between">
            <div className="text-blue-600">
              <CalendarIcon className="h-8 w-8" />
            </div>
            {bookingTrend !== "0%" && <span
              className={`rounded-full px-2.5 py-0.5 text-sm ${
                isBookingUp
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isBookingUp ? (
                <ArrowUpIcon className="mr-1 inline h-3 w-3" />
              ) : (
                <ArrowDownIcon className="mr-1 inline h-3 w-3" />
              )}
              {bookingTrend}
            </span>}
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-900">
            {totalBookings}
          </h3>
          <p className="text-sm font-medium text-gray-600">Total Bookings</p>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>{bookingStatusCount?.pending} pending</span>
            <span>{bookingStatusCount?.completed} completed</span>
          </div>
        </div>
      }
    />
  );
};

export default BookingMetrics;
