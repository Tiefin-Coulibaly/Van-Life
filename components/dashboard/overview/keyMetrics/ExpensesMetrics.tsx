import { BookingStats } from "@/types/bookingTypes";
import Card from "../../Card";
import {
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

const ExpensesMetrics = ({
  isRevenueUp,
  revenueTrend,
  revenueStatusCount,
  totalAmount,
  currentMonthExpenses,
}: BookingStats) => {
  return (
    <Card
      className="bg-gradient-to-br from-green-50 to-green-100 shadow-sm"
      content={
        <div>
          <div className="flex items-center justify-between">
            <div className="text-green-600">
              <CurrencyDollarIcon className="h-8 w-8" />
            </div>
            {revenueTrend !== "0%" && (
              <span
                className={`rounded-full px-2.5 py-0.5 text-sm ${
                  isRevenueUp
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isRevenueUp ? (
                  <ArrowUpIcon className="mr-1 inline h-3 w-3" />
                ) : (
                  <ArrowDownIcon className="mr-1 inline h-3 w-3" />
                )}
                {revenueTrend}
              </span>
            )}
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-900">
            ${totalAmount}
          </h3>
          <p className="text-sm font-medium text-gray-600">Total Expenses</p>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
            <span>${revenueStatusCount?.pending} pending</span>
            <span>${currentMonthExpenses} this month</span>
          </div>
        </div>
      }
    />
  );
};

export default ExpensesMetrics;
