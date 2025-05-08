import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { BookingWithVan } from "@/types/bookingTypes";
import {
  formatDate,
  getRecentElements,
} from "@/app/lib/actions/dashboardActions";

interface BookingListProps {
  bookings: BookingWithVan[];
  className?: string;
  isOnOverview?: boolean;
}

const BookingList = ({
  bookings,
  className = "",
  isOnOverview,
}: BookingListProps) => {
  const recentBookings = getRecentElements(bookings, "startDate", 3);

  bookings = isOnOverview ? recentBookings : bookings;

  if (!bookings || bookings.length === 0) {
    return (
      <div
        className={`overflow-hidden ${className} flex min-h-[120px] w-full items-center justify-center`}
      >
        <p className="text-gray-500">No bookings found</p>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className} w-full`}>
      <ul className="divide-y divide-gray-200">
        {bookings.map((booking) => (
          <li key={booking.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                {booking.van?.images?.[0] && (
                  <Image
                    src={booking.van.images[0]}
                    alt={booking.van.name || "Van Image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 64px"
                  />
                ) }
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {booking.van?.name || "Unknown Van"}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    <ClockIcon className="mr-1 inline h-3 w-3" />
                    {formatDate(booking.startDate)} -{" "}
                    {formatDate(booking.endDate)}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    ${Number(booking.totalAmount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
