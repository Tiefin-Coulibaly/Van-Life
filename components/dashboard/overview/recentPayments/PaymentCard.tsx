import { determineHowManyDaysAgo } from "@/app/lib/actions/dashboardActions";
import { Payment } from "@prisma/client";
import Image from "next/image";
import { CreditCardIcon, ReceiptRefundIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type PaymentWithRelations = Payment & {
  van: {
    name: string | null;
    images: string[];
  };
  booking: {
    startDate: Date;
    endDate: Date;
    totalAmount: number;
  };
};

const PaymentCard = ({ payment }: { payment: PaymentWithRelations }) => {
  const diffDays = determineHowManyDaysAgo(payment.createdAt);

  // Format the payment amount
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(payment.booking.totalAmount);

  // Format the dates
  const startDate = new Date(payment.booking.startDate).toLocaleDateString();
  const endDate = new Date(payment.booking.endDate).toLocaleDateString();

  return (
    <div className="border-b  p-3 dark:bg-gray-800">
      <div className="flex items-center">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          {payment.van?.images?.[0] ? (
            <Image
              src={payment.van.images[0]}
              alt={payment.van.name || "Van Image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 64px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
              <CreditCardIcon className="h-8 w-8 text-gray-500" />
            </div>
          )}
        </div>

        <div className="ml-3 flex flex-1 flex-col">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {payment.van?.name || "Unnamed Van"}
            </h4>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {formattedAmount}
            </span>
          </div>

          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            <p className="flex items-center">
              <span className="mr-2">Booking:</span>
              {startDate} - {endDate}
            </p>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">
              {diffDays === 0 ? (
                "Today"
              ) : (
                <>
                  {diffDays} days ago • {payment.method}
                </>
              )}
            </span>

            {payment.receiptUrl && (
              <Link
                href={payment.receiptUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <ReceiptRefundIcon className="mr-1 h-4 w-4" />
                View Receipt
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
