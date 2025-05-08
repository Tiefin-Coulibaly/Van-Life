import BookingList from "./BookingList";
import SectionHeader from "../SectionHeader";
import { BookingWithVan } from "@/types/bookingTypes";

const RecentBookings = async ({ bookings }: { bookings: BookingWithVan[] }) => {
  const viewAllLink = bookings.length > 3 ? "/dashboard/bookings" : null;
  const viewAllText = viewAllLink ? "View All" : null;

  return (
    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Recent bookings */}
      <div className="col-span-full rounded-lg bg-white p-6 shadow-md">
        <SectionHeader
          title="Recent Bookings"
          viewAllLink={viewAllLink}
          viewAllText={viewAllText}
        />

        <BookingList bookings={bookings} isOnOverview={true} />
      </div>
    </div>
  );
};

export default RecentBookings;
