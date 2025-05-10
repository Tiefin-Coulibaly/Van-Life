import BookingMetrics from "./BookingMetrics";
import ExpensesMetrics from "./ExpensesMetrics";
import VansMetrics from "./VansMetrics";

const KeyMetrics = ({ bookingStats, vansTotal }) => {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
};

export default KeyMetrics;
