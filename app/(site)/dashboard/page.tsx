import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  calculateBookingStats,
  calculateRatingStats,
  fetchBookings,
  getTotalVans,
  userStats,
} from "@/app/lib/actions/dashboardActions";
import { Booking, Review, Van } from "@prisma/client";
import KeyMetrics from "@/components/dashboard/overview/keyMetrics/KeyMetrics";
import RecentBookings from "@/components/dashboard/overview/recentBookings/RecentBookings";
import RecentPayments from "@/components/dashboard/overview/recentPayments/RecentPayment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview | Van Life",
  description:
    "View your Van Life rental statistics, recent bookings, payments, and account activity at a glance.",
};

const OverviewSection = async () => {
  const session = await auth();
  const userData = await userStats(session?.user.id as string);
  const bookingStats = calculateBookingStats(userData?.bookings as Booking[]);
  const totalVans = getTotalVans(userData?.vansRented as Van[]);
  const ratingStats = calculateRatingStats(userData?.reviews as Review[]);
  const bookingsWithVans = await fetchBookings(session?.user.id as string);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back,{" "}
          {session?.user.name ||
            `${session?.user.firstName || ""} ${session?.user.lastName || ""}`}
        </h1>
        <p className="mt-1 text-gray-600">
          Here's what's happening with your rentals today.
        </p>
      </div>

      {/* Key metrics */}
      <KeyMetrics bookingStats={bookingStats} vansTotal={totalVans} />

      {/* Recent bookings and upcoming section */}
      <RecentBookings bookings={bookingsWithVans} />

      <div className="grid grid-cols-1">
        {/* Recent reviews or user activity */}
        <RecentPayments />
      </div>
    </>
  );
};

export default OverviewSection;
