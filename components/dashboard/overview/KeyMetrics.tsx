import BookingMetrics from "./BookingMetrics";
import ExpensesMetrics from "./ExpensesMetrics";
import ReviewMetrics from "./ReviewMetrics";
import VansMetrics from "./VansMetrics";

const KeyMetrics = ({ bookingStats, vansTotal, ratingStats }) => {
  console.log("KeyMetrics bookingStats", bookingStats);
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <BookingMetrics
        totalBookings={bookingStats.totalBookings}
        bookingTrend={bookingStats.bookingTrend}
        isBookingUp={bookingStats.isBookingUp}
        bookingStatusCount={bookingStats.bookingStatusCount}
      />

      <ExpensesMetrics
        isRevenueUp={bookingStats.isRevenueUp}
        revenueTrend={bookingStats.revenueTrend}
        revenueStatusCount={bookingStats.revenueStatusCount}
        totalAmount={bookingStats.totalAmount}
        currentMonthExpenses={bookingStats.currentMonthExpenses}
      />

      <VansMetrics vansTotal={vansTotal} />

      <ReviewMetrics
        totalReview={ratingStats.totalReviews}
        averageRating={ratingStats.averageRating}
        recentRating={ratingStats.recentRating}
      />
    </div>
  );
};

export default KeyMetrics;
